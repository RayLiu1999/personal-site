import { ref, readonly, onMounted } from 'vue'

export const useDarkMode = () => {
  const isDark = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateDarkMode()
  }

  const updateDarkMode = () => {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  }

  const initDarkMode = () => {
    if (import.meta.client) {
      // 檢查本地存儲的偏好設定
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) {
        isDark.value = saved === 'true'
      } else {
        // 如果沒有保存的偏好，檢查系統偏好
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      updateDarkMode()
    }
  }

  onMounted(() => {
    initDarkMode()
  })

  return {
    isDark: readonly(isDark),
    toggleDarkMode
  }
}
