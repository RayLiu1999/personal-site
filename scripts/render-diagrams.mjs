// Render the architecture diagrams (scripts/diagrams/p<id>.mmd) to static SVGs in assets/diagrams/.
//
// Usage: node scripts/render-diagrams.mjs
//
// Runs Mermaid in headless Chrome (set CHROME to its path if it isn't the macOS default), so the site ships
// plain SVG instead of the Mermaid runtime. Labels are measured in the Cubic 11 pixel font the page shows them in.
// Mermaid's own <style> is dropped: the colours come from island.css, so the diagrams follow day and night.
// Re-run after editing a .mmd file. Keep labels to ASCII (always in the font subset) or re-run subset-cubic-font.py too.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'scripts/diagrams')
const OUT = join(ROOT, 'assets/diagrams')
const FONT = pathToFileURL(join(ROOT, 'public/fonts/cubic-11-subset.woff2')).href
const MERMAID = 'https://cdn.jsdelivr.net/npm/mermaid@11.13.0/dist/mermaid.min.js'
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const sources = Object.fromEntries(
  readdirSync(SRC).filter(f => f.endsWith('.mmd')).map(f => [f.slice(0, -4), readFileSync(join(SRC, f), 'utf8')])
)

const page = `<!doctype html><meta charset="utf-8">
<style>@font-face { font-family: "Cubic 11"; src: url("${FONT}") format("woff2"); }</style>
<script src="${MERMAID}"></script>
<pre id="out"></pre>
<script>
(async () => {
  await document.fonts.load('14px "Cubic 11"')
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    htmlLabels: false,
    fontFamily: '"Cubic 11"',
    themeVariables: { fontFamily: '"Cubic 11"', fontSize: '14px' },
    flowchart: { htmlLabels: false, curve: 'linear', padding: 12, nodeSpacing: 36, rankSpacing: 48, subGraphTitleMargin: { top: 16, bottom: 6 } }
  })
  const out = {}
  for (const [id, src] of Object.entries(${JSON.stringify(sources)})) out[id] = (await mermaid.render(id, src)).svg
  document.getElementById('out').textContent = JSON.stringify(out)
})().catch(e => { document.getElementById('out').textContent = 'ERROR ' + e })
</script>`

const dir = mkdtempSync(join(tmpdir(), 'diagrams-'))
try {
  const html = join(dir, 'render.html')
  writeFileSync(html, page)
  const dom = execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--allow-file-access-from-files', `--user-data-dir=${join(dir, 'profile')}`,
    '--virtual-time-budget=20000', '--dump-dom', pathToFileURL(html).href
  ], { encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] })

  const text = dom.match(/<pre id="out">([\s\S]*?)<\/pre>/)?.[1]
    ?.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  if (!text || text.startsWith('ERROR')) throw new Error(`Rendering failed: ${text || 'no output'}`)

  mkdirSync(OUT, { recursive: true })
  for (const [id, svg] of Object.entries(JSON.parse(text))) {
    const clean = svg
      .replace(/<style>[\s\S]*?<\/style>/g, '')
      // Only arrowheads are used; drop the circle and cross markers Mermaid always defines.
      .replace(/<marker id="[^"]*-(circle|cross)(Start|End)"[\s\S]*?<\/marker>/g, '')
      .replace(/ style="(max-width: [\d.]+px;|;?)"/g, '')
      .replace(/ font-(style|weight)="normal"/g, '')
      .replace(/ (aria-roledescription|role)="[^"]*"/g, '')
      // Subgraph titles go in the top-left corner, like a Minecraft window title, clear of edges entering from above.
      .replace(/(<rect x="([\d.]+)"[^>]*><\/rect><g class="cluster-label" transform="translate\()[\d.]+/g, (_, head, x) => head + (Number(x) + 10))
    writeFileSync(join(OUT, `${id}.svg`), clean + '\n')
    console.log(`${id}.svg  ${(clean.length / 1024).toFixed(1)} KB`)
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}
