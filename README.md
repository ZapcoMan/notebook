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
