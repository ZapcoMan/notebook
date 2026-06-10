<!-- markdownlint-disable -->

<div align="center">

# 笔记

轻量、优雅、现代化的本地便签工具<br>
基于 Tauri 2 + React 构建

[反馈问题]() · [更新日志]()

[![Version](https://img.shields.io/github/v/release/ZapcoMan/notebook)](https://github.com/ZapcoMan/notebook/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![React 19](https://img.shields.io/badge/React-19-blue?logo=react)
![Tauri v2](https://img.shields.io/badge/Tauri-v2-%2324C8D8?logo=tauri)
![Rust Edition 2021](https://img.shields.io/badge/Rust-2021-%23000000?logo=rust)

</div>

<!-- markdownlint-restore -->

---

## 项目说明

> **致敬声明**：本项目基于 [Achilng/floral-notepaper](https://github.com/Achilng/floral-notepaper) 进行二次开发，在此向原作者表示诚挚的敬意和感谢！

### 二次开发改动

相较于原项目，本版本进行了以下修改与升级：

#### 新增功能

- **磁贴迷你操作栏** — 悬停磁贴时显示复制、编辑、关闭按钮组，按钮颜色自适应明暗背景
- **磁贴快速编辑** — 双击磁贴直接进入编辑模式，无需打开 NotePad，Esc 或失焦退出
- **多磁贴管理** — 支持同时钉住多个笔记，显示数量徽标，一键全部取消钉住
- **分类管理** — 新建、重命名、删除分类标签，拖拽移动笔记到不同分类，右键上下文菜单
- **外部文件支持** — 打开并编辑外部 `.md` 文件，支持文件变更自动同步，可配置自动保存
- **Markdown 工具栏增强** — 新增行内公式（`$...$`）与块级公式（`$$...$$`）快捷插入按钮
- **LaTeX 数学公式** — 基于 KaTeX 渲染行内与块级数学公式
- **代码块一键复制** — Markdown 预览中代码块悬停显示复制按钮
- **可调节侧栏宽度** — 拖拽侧栏边缘自由调整笔记列表宽度
- **可调节编辑器分栏比例** — 编辑/预览分栏支持拖拽调整比例
- **显示/隐藏窗口快捷键** — 新增全局快捷键用于快速切换主窗口可见性
- **Ctrl+右键快速关闭磁贴** — 可选的快捷操作，一键关闭磁贴窗口
- **磁贴 Markdown 渲染** — 可选在磁贴中直接渲染 Markdown 内容

#### 体验优化

- **状态栏增强** — 实时显示光标位置（行/列）、阅读时间预估、字节大小、当前分类标签
- **主题过渡动画** — 切换明暗主题时颜色渐变平滑过渡，避免硬切闪烁
- **磁贴自定义** — 支持自定义磁贴颜色（跟随主题 / 自定义色值）、透明度调节
- **字号独立控制** — 编辑器与小窗/磁贴字号可分别设置
- **窗口尺寸记忆** — 可选记住小窗尺寸，下次打开恢复上次大小
- **多语言支持** — 完整支持简体中文、繁体中文、English 三种语言

#### 架构改进

- **模块化重构** — 前端按功能领域拆分为 `features/` 模块（notes、settings、windows、importExport、markdown），提高可维护性
- **全面的测试覆盖** — 为核心功能模块添加了单元测试（Vitest）
- **国际化框架** — 基于 i18next 实现完整的国际化方案
- **窗口池与回收机制** — NotePad 窗口复用池，减少频繁创建/销毁开销
- **Rust 后端增强** — 新增分类管理、外部文件读写、多窗口管理等 Tauri Command

## 功能特点

- **Markdown 编辑与预览** — 支持 GitHub Flavored Markdown 语法，实时切换编辑和预览模式
- **快捷便签** — 通过托盘或全局快捷键（默认 `Ctrl+Space`）随时唤出便签窗口
- **磁贴模式** — 将笔记固定在桌面某处，以便快速查阅和复制
- **磁贴迷你操作栏** — 悬停磁贴时显示复制、编辑、关闭按钮组，按钮颜色自适应明暗背景
- **磁贴快速编辑** — 双击磁贴直接进入编辑模式，无需打开 NotePad，Esc 或失焦退出
- **多磁贴管理** — 支持同时钉住多个笔记，显示数量徽标，一键全部取消钉住
- **状态栏增强** — 实时显示光标位置（行/列）、阅读时间预估、当前分类标签
- **主题过渡动画** — 切换明暗主题时颜色渐变平滑过渡，避免硬切闪烁
- **导入导出** — 支持 `.md` 文件的导入和导出

## 应用场景

- 当作随时可见的剪贴板，快速暂存和复制文本
- 游戏、看视频时随手记点东西
- 临时记录思路或灵感
- 桌面待办清单

## 下载安装

前往 [GitHub Releases](https://github.com/ZapcoMan/notebook/releases) 下载最新版本。

## 从源码构建

### 环境要求

- [Node.js](https://nodejs.org/) 当前 Node 版本是 v24.15.0 这个项目至少需要 22.12.0 以上的版本
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI 2](https://tauri.app/)

### 步骤

```bash
git clone https://github.com/ZapcoMan/notebook.git
cd notebook

npm install

# 开发模式
npm run tauri dev

# 构建发布版本
npm run tauri build
```

构建产物输出到 `src-tauri/target/release/bundle/`。

## 许可证

[MIT](LICENSE)
