// 按钮类型
export const typeEnum = {
  default:
    'border border-slate-200 text-slate-600 bg-white hover:bg-slate-200 active:bg-slate-50' +
    ' dark:border-slate-700 dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800',

  primary:
    'text-white bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-800' +
    ' dark:bg-zinc-800 dark:hover:bg-zinc-600 dark:active:bg-zinc-700',

  info:
    'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200' +
    ' dark:text-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700',

  main:
    'text-white bg-red-500 hover:bg-red-600 active:bg-red-500' +
    ' dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-600'
}

// 按钮尺寸
export const sizeEnum = {
  // 大号按钮
  large: {
    button: 'h-11 px-5 text-base',
    icon: 18
  },
  // 默认按钮
  default: {
    button: 'h-9 px-4 text-sm',
    icon: 16
  },
  // 小型按钮
  small: {
    button: 'h-7 px-3 text-xs',
    icon: 14
  },
  // 迷你按钮
  mini: {
    button: 'h-6 px-2 text-xs',
    icon: 12
  }
}
