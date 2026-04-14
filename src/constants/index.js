/**
 * 项目常量统一管理
 * 存储键命名规范：{prefix}:{namespace}:{key}
 */

export const APP_PREFIX = 'fn' // 应用前缀
export const PC_WIDTH = 1280 // PC 设备宽度

// 存储键
export const STORAGE_KEY = {
  ACCESS_TOKEN_KEY: `${APP_PREFIX}:auth:access_token`, // 访问令牌
  REFRESH_TOKEN_KEY: `${APP_PREFIX}:auth:refresh_token`, // 刷新令牌
  USER_INFO_KEY: `${APP_PREFIX}:user:info` // 用户信息
}
