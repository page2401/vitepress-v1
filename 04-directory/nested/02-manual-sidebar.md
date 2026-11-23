---
title: "嵌套实测 B：手写侧边栏与孤岛页风险"
description: "演示 VitePress v1 缺少原生 autogenerate 时手动同步 .vitepress/config.mts 的维护特征。"
---

# 嵌套实测 B：手写侧边栏与孤岛页风险

当前文件的物理路径为：

```text
sites/vitepress-v1/04-directory/nested/02-manual-sidebar.md
```

::: tip 手写配置的唯一好处：分组命名完全自由
请看左侧边栏：本子目录虽然物理文件夹名叫 `nested`，但我们在 `.vitepress/config.mts` 中可以为它自由指定中文折叠组标题 **「nested 子目录（手写配置）」**——反观右侧窗口启用 `autogenerate` 的 Astro Starlight，子目录分组标题只能生硬地显示英文文件夹原名 `nested`。
:::

::: danger 核心痛点：双处修改与“孤岛页”隐患
VitePress v1 内核**没有**提供类似 Starlight `autogenerate: { directory }` 的自动目录扫描能力。每当作者在 `04-directory/nested/` 下新建一个 `.md` 文件：
1. 页面虽然会被编译出 HTML，但**左侧边栏不会自动出现它**（沦为读者找不到的“孤岛页”）；
2. 必须每次同步打开 `.vitepress/config.mts` 手动追加 `{ text, link }`，或者额外引入社区插件 `vitepress-sidebar`。
:::

- [返回上一篇：《嵌套实测 A：文件名前缀排序的代价》](./01-prefix-order)
- [返回《04. 目录结构与路由取舍》](../)
