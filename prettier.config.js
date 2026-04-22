/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'none', // 不添加尾随逗号
  tabWidth: 2, // 缩进宽度
  useTabs: false, // 不使用制表符
  semi: false, // 不使用分号
  singleQuote: true, // 使用单引号
  endOfLine: 'lf', // 使用 LF
  plugins: ['prettier-plugin-tailwindcss'] // 添加插件
}

export default config
