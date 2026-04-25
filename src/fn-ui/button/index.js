// fn-ui/button/index.js
import Button from './index.vue'

Button.install = (app) => {
  app.component(Button.name, Button)
}

export { Button }
export default Button
