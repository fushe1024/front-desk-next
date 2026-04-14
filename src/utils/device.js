import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_WIDTH } from '@/constants'

const { width } = useWindowSize()

/**
 * 当前设备是否为移动端设备
 */
export const isMobileTerminal = computed(() => width.value < PC_WIDTH)

/**
 * 是否为移动端设备
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
