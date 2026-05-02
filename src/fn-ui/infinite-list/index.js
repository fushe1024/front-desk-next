// fn-ui/infinite-list/index.js
import InfiniteList from './index.vue'

InfiniteList.install = (app) => {
  app.component(InfiniteList.name, InfiniteList)
}

export { InfiniteList }
export default InfiniteList
