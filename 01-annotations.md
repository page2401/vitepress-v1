---
title: "01. 专属标注与元数据"
description: "测试 VitePress v1 (1.6.4) 的 Frontmatter 宽松元数据、::: 自定义容器、可折叠块、GitHub Alerts 与内联 Badge 组件。"
outline: [2, 3]
---

# 01. 专属标注与元数据 <Badge type="tip" text="vitepress@1.6.4" />

不同静态网站生成器对“提示框 / 标注（Callouts / Admonitions）”和页面元数据的语法约定存在显著分歧。本页使用统一语义的测试文本展示 **VitePress v1 (`1.6.4`)** 的原生表现。

## 1. Frontmatter 元数据机制

VitePress v1 采用**宽松型 YAML Frontmatter**：无需预先编写 Schema 文件即可自由读取任意自定义字段（通过 Vue 组合式 API `useData().frontmatter` 访问）。目录层级通过 `outline: [2, 3]` 控制。

- **当前页标题字段**：`title: 01. 专属标注与元数据`
- **目录深度字段**：`outline: [2, 3]`
- **内联徽章支持**：在 Markdown 标题或正文中可直接使用内置全局组件 `<Badge type="info" text="Info" />` `<Badge type="warning" text="Warning" />` `<Badge type="danger" text="Danger" />`。

## 2. 标准提示容器（Triple-Colon Containers）

VitePress v1 使用 `::: <类型> [可选自定义标题]` 语法（`:::` 与类型名之间通常留一个空格，自定义标题直接跟在空格后）：

::: info
默认信息提示块：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（构建产物）双分支，互不污染提交历史。
:::

::: tip 性能优化建议（自定义标题）
在 VitePress v1 中，自定义标题直接写在 `::: tip ` 之后的同一行文本中，无需方括号包裹。支持内部嵌套行内代码如 `cleanUrls: true` 与加粗强调。
:::

::: warning 版本边界注意
注意区分关键字命名：VitePress 使用 `warning` 表示警告块，而 Astro Starlight 等基于 `remark-directive` 的框架通常使用 `caution`。
:::

::: danger 不可逆分支覆盖警告
自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！
:::

## 3. 原生可折叠详情容器（Details Block）

VitePress v1 将可折叠块也统一纳入了 `:::` 容器语法，无需手写原生 HTML `<details>` 标签：

::: details 点击展开查看 VitePress 容器语法源码结构
```markdown
::: tip 性能优化建议（自定义标题）
自定义标题直接跟在类型关键字空格后。
:::
```
除了代码块，折叠容器内同样支持列表、表格与数学公式 $f(x) = x^2 + 1$。
:::

## 4. GitHub 风格引用警报（GFM Alerts）兼容性

许多开发者习惯在 GitHub Markdown 中直接编写 `> [!NOTE]` 语法。以下为未经任何改写的原始 GFM Alert 块在 VitePress v1 下的实测渲染结果：

> [!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本。VitePress v1 原生支持将其解析为带样式的提示框。

> [!IMPORTANT]
> 跨平台迁移 Markdown 文档时，是否原生兼容 `> [!IMPORTANT]` 与 `> [!WARNING]` 直接决定了旧文档的改造成本。

> [!CAUTION]
> 若目标生成器未内置 GFM Alert 解析器，上方标记会退化为普通引用块并原样露出 `[!CAUTION]` 字符串。
