---
title: 02. 流程图与时序图
description: 测试 VitePress v1 (1.6.4) 通过 vitepress-plugin-mermaid 渲染复杂流程图、时序图与状态机。
outline: [2, 3]
---

# 02. 流程图与时序图（Mermaid） <Badge type="info" text="mermaid@11.17.2" />

VitePress v1 默认**不会**将 ` ```mermaid ` 代码块渲染为图形，而是当作普通代码高亮显示。本子站通过社区主流方案 `vitepress-plugin-mermaid@2.0.17` 包装 `.vitepress/config.mts` 完成接入。

::: warning 插件版本约束实录
实测发现 `vitepress-plugin-mermaid@2.0.17` 的 `peerDependencies` 声明为 `"mermaid": "10 || 11"`，尚不兼容最新的 `mermaid@12.x`，因此本子站精确锁定 `mermaid@11.17.2`。
:::

## 1. 复杂子图与架构流程图（`flowchart TD`）

测试中文节点标签、子图嵌套（`subgraph`）、虚线边与条件分支：

```mermaid
flowchart TD
    subgraph MainRepo["主仓库 page2401.github.io"]
        Spec["相似 *.md 基准规范"]
        SubPtr["Git Submodule 指针 (sites/*)"]
        Workbench["对比工作台源码 (main)"]
    end

    subgraph SubRepo["独立子仓库 (如 vitepress-v1)"]
        SrcBranch["main 分支: 框架配置 + 适配版 *.md"]
        Actions{"GitHub Actions 构建"}
        PageBranch["page 孤儿分支: 纯静态 HTML/CSS/JS"]
        SrcBranch --> Actions
        Actions -->|"构建通过 + .nojekyll"| PageBranch
    end

    SubPtr -.->|"跟踪最新提交"| SrcBranch
    Workbench -->|"构建期提取真实 *.md"| Portal["https://page.2401.xyz/"]
    PageBranch -->|"GitHub Organization Pages"| SubSite["https://page.2401.xyz/vitepress-v1/"]
```

## 2. 编译管线交互时序图（`sequenceDiagram`）

测试多参与者生命线、`alt` 分支块及激活框（`activate`/`deactivate`）：

```mermaid
sequenceDiagram
    autonumber
    actor Author as 文档作者
    participant Git as 子模块 main 分支
    participant CI as GitHub Actions (Node 22)
    participant Engine as VitePress 1.6.4 编译器
    participant Pages as GitHub Pages (page 分支)

    Author->>Git: 提交修改后的 *.md 文档
    Git->>CI: 触发 deploy-page.yml 工作流
    activate CI
    CI->>Engine: 执行 vitepress build
    activate Engine
    alt 包含数学公式 ($...$ / $$...$$)
        Engine->>Engine: markdown-it-mathjax3 编译为内联 SVG
    else 包含 Mermaid 代码块
        Engine->>Engine: 转换为 <Mermaid> 客户端组件挂载点
    end
    Engine-->>CI: 输出静态产物至 .vitepress/dist
    deactivate Engine
    CI->>Pages: force_orphan 推送产物与 .nojekyll
    deactivate CI
    Pages-->>Author: 子路径 /vitepress-v1/ 即刻生效
```

## 3. 子模块同步状态机（`stateDiagram-v2`）

测试状态机语法与状态迁移说明标签：

```mermaid
stateDiagram-v2
    [*] --> CleanSubmodule: git clone --recurse-submodules
    CleanSubmodule --> SubmoduleModified: 编辑子模块 *.md 基准文档
    SubmoduleModified --> SubmodulePushed: 子模块 commit & push origin main
    SubmodulePushed --> PageDeploying: 子仓库 Actions 自动更新 page 分支
    SubmodulePushed --> MainRepoUpdated: 主仓库 git add sites/* 更新指针
    PageDeploying --> LiveSynced: 子站实测渲染已就绪
    MainRepoUpdated --> LiveSynced: 主站源码差异视图已同步
    LiveSynced --> [*]
```
