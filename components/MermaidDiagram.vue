<template>
  <div class="mermaid-diagram-wrapper my-4">
    <div ref="mermaidRef" class="mermaid flex justify-center bg-transparent"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import mermaid from 'mermaid';

const props = defineProps({
  code: {
    type: String,
    required: true
  }
});

const mermaidRef = ref(null);

const renderDiagram = async () => {
  if (mermaidRef.value && props.code) {
    try {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit'
      });
      
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      const { svg } = await mermaid.render(id, props.code);
      mermaidRef.value.innerHTML = svg;
    } catch (e) {
      console.error("Mermaid syntax error", e);
      mermaidRef.value.innerHTML = `<div class="text-red-500 font-mono text-sm border border-red-200 p-4 rounded bg-red-50 dark:bg-red-900/20">Failed to render Mermaid diagram.<br><br>${e.message}</div>`;
    }
  }
};

onMounted(() => {
  renderDiagram();
  
  // Optional: listen for theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', renderDiagram);
  }
});

watch(() => props.code, () => {
  renderDiagram();
});
</script>
