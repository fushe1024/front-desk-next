import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export function useDevice() {
  // 响应式媒体查询
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  // 设备类型
  const device = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  return {
    device,
    isMobile,
    isTablet,
    isDesktop
  }
}
