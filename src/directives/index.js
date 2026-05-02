// 自动导入当前目录下所有指令
const modules = import.meta.glob('./*.js')

export default {
  async install(app) {
    const entries = Object.entries(modules)

    // 并行加载
    const results = await Promise.all(
      entries.map(async ([path, loader]) => {
        const mod = await loader()

        // 提取文件名
        const name = path.match(/\.\/(.*)\.js$/)[1]

        return {
          name,
          directive: mod.default || mod
        }
      })
    )

    // 注册
    results.forEach(({ name, directive }) => {
      app.directive(name, directive)
    })
  }
}
