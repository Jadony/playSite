# 游戏充值平台

<div align="center">

🎮 一个基于 React + TypeScript 的现代化游戏充值平台

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12.0-0170FE.svg)](https://ant.design/)

</div>

## ✨ 特性

- 🎨 **现代化 UI** - 基于 Ant Design 的游戏风格界面设计
- 🎬 **Spine 动画** - 集成 pixi.js + pixi-spine 支持高性能骨骼动画
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- ⚡ **极速开发** - Vite 构建工具，HMR 热更新
- 🎯 **TypeScript** - 完整的类型支持，提升开发体验
- 🔐 **安全支付** - 多种支付方式，安全可靠
- 💎 **状态管理** - Zustand 轻量级状态管理
- 🎁 **丰富组件** - 可复用的业务组件库

## 📦 技术栈

### 核心框架
- **React 18.2** - 用户界面构建
- **TypeScript 5.2** - 类型安全
- **Vite 5.0** - 构建工具

### UI 组件
- **Ant Design 5.12** - 企业级 UI 组件库
- **TailwindCSS 3.4** - 原子化 CSS 框架

### 动画引擎
- **Pixi.js 7.3** - 2D 渲染引擎
- **Pixi Spine 4.0** - Spine 动画支持

### 状态管理
- **Zustand 4.4** - 轻量级状态管理
- **React Query 5.14** - 服务端状态管理

### 工具库
- **Axios 1.6** - HTTP 客户端
- **Day.js 1.11** - 日期处理
- **ahooks 3.7** - React Hooks 工具库

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
cd game-recharge-platform
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
game-recharge-platform/
├── public/                      # 静态资源
├── src/
│   ├── assets/                  # 资源文件
│   │   ├── spine/              # Spine 动画资源
│   │   ├── images/             # 图片资源
│   │   └── fonts/              # 字体文件
│   ├── components/             # 组件
│   │   ├── SpineCharacter/    # Spine 角色组件
│   │   ├── RechargePanel/     # 充值面板
│   │   ├── AmountSelector/    # 金额选择器
│   │   ├── PaymentCard/       # 支付卡片
│   │   └── common/            # 公共组件
│   │       ├── Header/        # 头部导航
│   │       ├── Footer/        # 页脚
│   │       └── Loading/       # 加载组件
│   ├── hooks/                  # 自定义 Hooks
│   │   └── useSpineAnimation.ts
│   ├── pages/                  # 页面
│   │   ├── Home/              # 首页
│   │   ├── Recharge/          # 充值页
│   │   ├── History/           # 历史记录
│   │   └── Profile/           # 个人中心
│   ├── services/               # 服务层
│   │   ├── api.ts             # API 配置
│   │   └── payment.ts         # 支付服务
│   ├── store/                  # 状态管理
│   │   └── rechargeStore.ts   # 充值状态
│   ├── styles/                 # 样式文件
│   │   └── global.css         # 全局样式
│   ├── utils/                  # 工具函数
│   │   ├── spine-loader.ts    # Spine 加载器
│   │   └── helpers.ts         # 辅助函数
│   ├── App.tsx                 # 应用入口
│   ├── main.tsx               # 主文件
│   └── vite-env.d.ts          # 类型声明
├── index.html                  # HTML 模板
├── package.json               # 项目配置
├── tsconfig.json              # TypeScript 配置
├── vite.config.ts             # Vite 配置
├── tailwind.config.js         # TailwindCSS 配置
└── README.md                  # 项目说明
```

## 🎯 核心功能

### 1. Spine 动画系统

```tsx
import SpineCharacter from '@components/SpineCharacter'

<SpineCharacter
  spineDataUrl="/assets/spine/character.json"
  width={400}
  height={600}
  animation="idle"
  loop={true}
/>
```

### 2. 充值面板

```tsx
import RechargePanel from '@components/RechargePanel'

<RechargePanel />
```

### 3. 状态管理

```tsx
import { useRechargeStore } from '@store/rechargeStore'

const { createOrder, userBalance } = useRechargeStore()
```

## 🎨 主题定制

项目使用 TailwindCSS 和 Ant Design 主题系统，可在以下文件中自定义：

- `tailwind.config.js` - TailwindCSS 主题配置
- `src/main.tsx` - Ant Design 主题配置

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {...},
        game: {...}
      }
    }
  }
}
```

## 📚 Spine 动画集成指南

### 1. 准备 Spine 资源

将 Spine 导出的文件放入 `src/assets/spine/` 目录：
- `character.json` - Spine 数据文件
- `character.atlas` - 纹理图集文件
- `character.png` - 纹理图片

### 2. 预加载资源

```tsx
import { SpineLoader, SPINE_ASSETS } from '@utils/spine-loader'

// 预加载
await SpineLoader.preloadSpineAssets([
  SPINE_ASSETS.CHARACTER_IDLE,
  SPINE_ASSETS.CHARACTER_ATTACK,
])
```

### 3. 使用组件

```tsx
<SpineCharacter
  spineDataUrl="/assets/spine/character.json"
  animation="idle"
  width={400}
  height={600}
/>
```

## 🔧 环境变量

复制 `.env.example` 为 `.env.local` 并配置：

```env
# API 地址
VITE_API_BASE_URL=http://localhost:3000/api

# 应用标题
VITE_APP_TITLE=游戏充值平台

# Mock 数据
VITE_ENABLE_MOCK=false
```

## 🚢 部署

### Vercel 部署

```bash
npm install -g vercel
vercel
```

### Nginx 部署

```bash
npm run build
# 将 dist 目录上传到服务器
```

Nginx 配置示例：

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    root /path/to/dist;
    try_files $uri $uri/ /index.html;
  }
}
```

## 📝 开发规范

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 React Hooks 规则
- 使用 TypeScript 严格模式

### 组件规范

- 函数组件 + Hooks
- Props 类型定义
- 样式模块化

### Git 提交规范

```bash
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具链相关
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

[MIT](LICENSE)

## 👥 作者

Your Name - [@yourhandle](https://twitter.com/yourhandle)

项目链接: [https://github.com/yourusername/game-recharge-platform](https://github.com/yourusername/game-recharge-platform)

## 🙏 致谢

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Pixi.js](https://pixijs.com/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
