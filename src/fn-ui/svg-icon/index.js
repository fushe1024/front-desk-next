// fn-ui/svg-icon/index.js
import SvgIcon from './index.vue'

SvgIcon.install = (app) => {
  app.component(SvgIcon.name, SvgIcon)
}

export { SvgIcon }
export default SvgIcon
