import { Assets } from 'pixi.js'

interface SpineAsset {
  name: string
  url: string
}

/**
 * Spine 资源加载器
 * 提供资源预加载、缓存管理等功能
 */
export class SpineLoader {
  private static cache = new Map<string, any>()
  private static loadingPromises = new Map<string, Promise<any>>()

  /**
   * 预加载 Spine 资源
   * @param assets 资源列表
   * @returns Promise
   */
  static async preloadSpineAssets(assets: SpineAsset[]): Promise<void> {
    const promises = assets.map(async ({ name, url }) => {
      if (!this.cache.has(name)) {
        // 避免重复加载
        if (!this.loadingPromises.has(name)) {
          const loadPromise = Assets.load(url)
            .then((resource) => {
              this.cache.set(name, resource)
              this.loadingPromises.delete(name)
              return resource
            })
            .catch((error) => {
              console.error(`Failed to load spine asset: ${name}`, error)
              this.loadingPromises.delete(name)
              throw error
            })

          this.loadingPromises.set(name, loadPromise)
        }

        await this.loadingPromises.get(name)
      }
    })

    await Promise.all(promises)
  }

  /**
   * 获取已缓存的 Spine 资源
   * @param name 资源名称
   * @returns 资源对象或 undefined
   */
  static getSpineAsset(name: string): any {
    return this.cache.get(name)
  }

  /**
   * 检查资源是否已加载
   * @param name 资源名称
   * @returns boolean
   */
  static hasAsset(name: string): boolean {
    return this.cache.has(name)
  }

  /**
   * 清除指定资源缓存
   * @param name 资源名称
   */
  static clearAsset(name: string): void {
    this.cache.delete(name)
  }

  /**
   * 清除所有缓存
   */
  static clearCache(): void {
    this.cache.clear()
    this.loadingPromises.clear()
  }

  /**
   * 获取缓存大小
   * @returns 缓存的资源数量
   */
  static getCacheSize(): number {
    return this.cache.size
  }

  /**
   * 批量加载并等待所有资源就绪
   * @param assets 资源列表
   * @param onProgress 进度回调
   */
  static async loadWithProgress(
    assets: SpineAsset[],
    onProgress?: (loaded: number, total: number) => void
  ): Promise<void> {
    let loaded = 0
    const total = assets.length

    for (const asset of assets) {
      await this.preloadSpineAssets([asset])
      loaded++
      onProgress?.(loaded, total)
    }
  }
}

/**
 * 预定义的 Spine 资源配置
 * 可根据实际项目调整
 */
export const SPINE_ASSETS = {
  CHARACTER_IDLE: {
    name: 'character_idle',
    url: '/assets/spine/character_idle.json',
  },
  CHARACTER_ATTACK: {
    name: 'character_attack',
    url: '/assets/spine/character_attack.json',
  },
  CHARACTER_WIN: {
    name: 'character_win',
    url: '/assets/spine/character_win.json',
  },
  EFFECT_COIN: {
    name: 'effect_coin',
    url: '/assets/spine/effect_coin.json',
  },
  EFFECT_SPARKLE: {
    name: 'effect_sparkle',
    url: '/assets/spine/effect_sparkle.json',
  },
}
