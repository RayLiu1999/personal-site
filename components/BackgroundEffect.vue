<template>
  <canvas ref="canvas" class="fixed inset-0 pointer-events-none z-0 opacity-30"></canvas>
</template>

<script setup>
const canvas = ref(null)
const { isDark } = useDarkMode()

let ctx = null
let animationFrameId = null
let particles = []

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }
}

const createParticles = () => {
  const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)
  particles = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: isDark.value ? '#A88D78' : '#8F725A' // Coffee 400 or 500
    })
  }
}

const draw = () => {
  if (!ctx || !canvas.value) return
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.globalAlpha = 0.4
    ctx.fill()
    
    // Update position
    p.x += p.speedX
    p.y += p.speedY
    
    // Wrap around screen
    if (p.x < 0) p.x = canvas.value.width
    if (p.x > canvas.value.width) p.x = 0
    if (p.y < 0) p.y = canvas.value.height
    if (p.y > canvas.value.height) p.y = 0
  })
  
  // Draw connections
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 150) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = p1.color
        ctx.globalAlpha = 1 - distance / 150
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    })
  })
  
  animationFrameId = requestAnimationFrame(draw)
}

watch(isDark, () => {
  createParticles()
})

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    resizeCanvas()
    createParticles()
    draw()
    
    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>
