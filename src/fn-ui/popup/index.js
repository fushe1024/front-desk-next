// fn-ui/popup/index.js
import Popup from './index.vue'

Popup.install = (app) => {
  app.component(Popup.name, Popup)
}

export { Popup }
export default Popup
