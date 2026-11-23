---
layout: home

hero:
  name: "VitePress v1"
  text: "静态站点生成基准实测"
  tagline: "锁定版本 vitepress@1.6.4 · Vue 3 + markdown-it + MathJax 3 + Mermaid 11"
  actions:
    - theme: brand
      text: "01. 专属标注与元数据 →"
      link: /01-annotations
    - theme: alt
      text: "02. 流程图 Mermaid"
      link: /02-diagrams
    - theme: alt
      text: "03. 数学公式 Math"
      link: /03-math

features:
  - title: "01. 原生双轨标注语法"
    details: "开箱同时支持 ::: info / tip / warning / danger / details 自定义容器与 GitHub 风格 > [!NOTE] 警报块，并内置全局 <Badge> 组件。"
    link: /01-annotations
  - title: "02. 插件化 Mermaid 11 渲染"
    details: "原生不解析 mermaid 代码块；通过 vitepress-plugin-mermaid@2.0.17 包装配置接入 mermaid@11.17.2（尚未放开 mermaid@12 peerDependency）。"
    link: /02-diagrams
  - title: "03. 构建期 MathJax 3 矢量公式"
    details: "配置 markdown: { math: true } 并安装 markdown-it-mathjax3@4.3.2 即可在构建期直接产出内联 SVG 公式，客户端零运行时开销。"
    link: /03-math
---

## 子模块版本档案

本站点由独立仓库 [`page2401/vitepress-v1`](https://github.com/page2401/vitepress-v1) 构建，`main` 分支仅保存纯源代码与适配后的 `*.md` 基准文档，GitHub Actions 在每次推送后自动编译并发布至孤儿分支 `page`。

| 依赖模块 | 精确锁定版本 | 在本子站中的职责 |
| :--- | :--- | :--- |
| `vitepress` | `1.6.4` | 核心文档生成器（基于 Vite + Vue 3 + `markdown-it`） |
| `markdown-it-mathjax3` | `4.3.2` | 构建期将 LaTeX 行内与块级公式编译为内联 SVG |
| `vitepress-plugin-mermaid` | `2.0.17` | 拦截 `mermaid` 代码块并注入客户端渲染组件 |
| `mermaid` | `11.17.2` | 流程图、时序图与状态机渲染引擎（受限于插件 `10 \|\| 11` 约束） |
