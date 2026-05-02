// 生成随机十六进制颜色 #xxxxxx
export const getRandomColor = () => {
  // 随机生成 0 - 16777215 的数字，再转成十六进制颜色
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

// 生成柔和的随机色
export const getRandomSoftColor = () => {
  const r = Math.floor(Math.random() * 127 + 127)
  const g = Math.floor(Math.random() * 127 + 127)
  const b = Math.floor(Math.random() * 127 + 127)
  return `rgb(${r}, ${g}, ${b})`
}
