import { useIntersectionObserver } from '@vueuse/core'

const DEFAULT_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz4='

const DEFAULT_ERROR = ''

const stops = new WeakMap()

export default {
  mounted(el, binding) {
    const img = el.tagName === 'IMG' ? el : el.querySelector('img')
    const src = binding.value

    if (!img || !src) return

    // 占位图
    img.src = DEFAULT_PLACEHOLDER

    const { stop } = useIntersectionObserver(
      el,
      ([e]) => {
        if (!e.isIntersecting) return

        img.src = src
        img.onerror = () => (img.src = DEFAULT_ERROR)

        stop()
      },
      { rootMargin: '100px' }
    )

    stops.set(el, stop)
  },

  unmounted(el) {
    stops.get(el)?.()
    stops.delete(el)
  }
}
