<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { getList } from '@/api/list'
import ListItem from './components/item.vue'

// 数据
const list = ref([])
const columns = ref([])
const columnCount = ref(2)

// 布局
const itemWidth = 260
const gap = 16

const containerRef = ref(null)

// 分页
const reqParams = ref({
  page: 1,
  pageSize: 20,
  categoryId: 'all',
  searchText: ''
})

// 状态
const isLoading = ref(false)
const isFinished = ref(false)

// 每列高度
const heights = ref([])

// 防止异步错乱
let layoutVersion = 0

// 加一层锁（防止疯狂触发）
let loadLock = false

// 获取数据
const getListData = async () => {
  if (isLoading.value || isFinished.value || loadLock) return

  loadLock = true
  isLoading.value = true

  const res = await getList(reqParams.value)
  const newList = res.list || []

  if (!newList.length) {
    isFinished.value = true
    isLoading.value = false
    loadLock = false
    return
  }

  list.value.push(...newList)

  await nextTick()
  await layoutItems(newList)

  reqParams.value.page++

  isLoading.value = false
  loadLock = false

  // 防止首屏撑不满
  await nextTick()
  checkFillScreen()
}

// 判断是否需要继续加载
const checkFillScreen = () => {
  const el = containerRef.value
  if (!el) return

  const containerHeight = el.offsetHeight
  const screenHeight = window.innerHeight

  if (containerHeight < screenHeight && !isFinished.value) {
    getListData()
  }
}

// 列数
const calcColumnCount = () => {
  const width = containerRef.value?.offsetWidth || window.innerWidth

  if (width < 768) {
    columnCount.value = 2
  } else {
    columnCount.value = Math.max(2, Math.floor(width / itemWidth))
  }
}

// 初始化
const initLayout = () => {
  calcColumnCount()
  columns.value = Array.from({ length: columnCount.value }, () => [])
  heights.value = Array(columnCount.value).fill(0)
}

// 图片尺寸
const loadImageSize = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }

    img.onerror = () => {
      resolve({ width: 1, height: 1 })
    }
  })
}

// 获取真实列宽
const getColumnWidth = () => {
  const containerWidth = containerRef.value?.offsetWidth || window.innerWidth

  return (containerWidth - gap * (columnCount.value - 1)) / columnCount.value
}

// 瀑布流布局（修复版）
const layoutItems = async (items) => {
  const currentVersion = ++layoutVersion

  const columnWidth = getColumnWidth()

  const tasks = items.map(async (item) => {
    const size = await loadImageSize(item.photo)

    const ratio = size.height / size.width || 1

    const realHeight = columnWidth * ratio || 200

    return {
      ...item,
      ...size,
      realHeight
    }
  })

  const itemsWithSize = await Promise.all(tasks)

  if (currentVersion !== layoutVersion) return

  itemsWithSize.forEach((item) => {
    const minIndex = heights.value.indexOf(Math.min(...heights.value))

    columns.value[minIndex].push(item)
    heights.value[minIndex] += item.realHeight + gap
  })
}
// resize
let timer = null

const handleResize = () => {
  clearTimeout(timer)

  timer = setTimeout(async () => {
    initLayout()
    await layoutItems(list.value)
  }, 200)
}

window.addEventListener('resize', handleResize)

// 生命周期
onMounted(async () => {
  initLayout()
  await getListData()
})

onUnmounted(() => {
  layoutVersion++
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <fn-infinite-list
    v-model="isLoading"
    :isFinished="isFinished"
    :distance="300"
    @loadMore="getListData"
  >
    <div
      ref="containerRef"
      class="masonry mx-auto bg-white px-2 pt-2 transition-colors duration-500 sm:px-3 md:px-6 lg:px-8 xl:px-10 dark:bg-zinc-800"
    >
      <div class="column" v-for="(col, index) in columns" :key="index">
        <list-item v-for="item in col" :key="item.id" :data="item" />
      </div>
    </div>
  </fn-infinite-list>
</template>

<style scoped>
.masonry {
  display: flex;
  gap: 16px;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
