// composables/useScrollAnimation.ts
export const useScrollAnimation = () => {
  const observer = ref<IntersectionObserver | null>(null)

  const observe = (elements: NodeListOf<Element> | HTMLElement[]) => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
          observer.value?.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    })

    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out')
      observer.value?.observe(el)
    })
  }

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    observe
  }
}
