---
title: "嵌套实测 A：文件名前缀排序的代价"
description: "演示 VitePress 下使用 01- 文件名前缀获得本地有序列表但将序号带入 URL 的取舍。"
---

# 嵌套实测 A：文件名前缀排序的代价

当前文件的物理路径为：

```text
sites/vitepress-v1/04-directory/nested/01-prefix-order.md
```

生成后的访问路由为：

```text
/vitepress-v1/04-directory/nested/01-prefix-order
```

::: info 观察结论
1. **本地浏览优势**：在代码编辑器和 GitHub 仓库界面中，`01-prefix-order.md` 自然排在 `02-manual-sidebar.md` 上方，与读者阅读顺序一致。
2. **线上路由缺陷**：URL 中永久带上了 `01-`。如果日后需要在这两篇之间插入一篇新文章，把原 `02-` 改名为 `03-`，所有外部收藏的旧链接都会立刻变成 `404`。
3. **补救成本**：虽然 VitePress v1 提供了 `rewrites: { '04-directory/nested/01-prefix-order.md': '04-directory/nested/prefix-order.md' }`，但一旦开启路由重写，同目录文档间的相对路径引用与真实文件名又会产生二次认知割裂。
:::

- [返回《04. 目录结构与路由取舍》](../)
- [下一篇：《嵌套实测 B：全手写侧边栏的维护负担》](./02-manual-sidebar)
