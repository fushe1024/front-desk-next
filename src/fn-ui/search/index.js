// fn-ui/popup/index.js
import Search from './index.vue'

Search.install = (app) => {
  app.component(Search.name, Search)
}

export { Search }
export default Search
