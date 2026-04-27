import Popover from './index.vue'

Popover.install = (app) => {
  app.component(Popover.name, Popover)
}

export { Popover }
export default Popover
