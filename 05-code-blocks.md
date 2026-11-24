---
title: "05. 高阶代码块与语法高亮"
description: "实测 VitePress v1 (1.6.4) 内置 Shiki 引擎的 [title] 标题栏、{3,7-9} 行高亮、[!code ++/--] 词法级 Diff 与 ::: code-group 多标签页。"
outline: [2, 3]
---

# 05. 高阶代码块与语法高亮 <Badge type="tip" text="vitepress@1.6.4 · Shiki" />

技术文档中超过 40% 的篇幅由代码块构成。**VitePress v1 (`1.6.4`)** 在构建期直接内置了双主题 **Shiki**（默认 `github-light` / `github-dark` 自适应切换），并在 `.vitepress/config.mts` 中开启 `markdown: { lineNumbers: true }` 后零客户端运行时输出完整行号、行聚焦、带语法着色的 Diff 以及多语言 Tab 代码组。

## 1. 代码块文件名标题栏与基础语法高亮

与 Starlight / Docusaurus / VuePress v2 使用 `title="scripts/resolve-route.ts"` 不同，VitePress 使用方括号 `[scripts/resolve-route.ts]` 声明标题，并借助单标签 `::: code-group` 渲染顶部文件名栏：

::: code-group

```ts [scripts/resolve-route.ts]
export interface RouteContext {
  basePath: string
  slug: string
  cleanUrls: boolean
}

export function formatDocRoute(ctx: RouteContext): string {
  const prefix = ctx.basePath.endsWith('/') ? ctx.basePath : `${ctx.basePath}/`
  const normalized = ctx.slug.replace(/^\/+|\/+$/g, '')
  if (!normalized || normalized === 'index') return prefix
  return ctx.cleanUrls ? `${prefix}${normalized}/` : `${prefix}${normalized}.html`
}
```

:::

::: tip VitePress 源码细节：裸代码块 `[title]` 会被静默剥离
在 VitePress 的 `preWrapperPlugin` 源码中，独立代码块执行了 `token.info.replace(/\[.*\]/, '')`，仅在右上角渲染 `<span class="lang">ts</span>`；只有放入 `::: code-group` 容器时，`extractTitle` 才会将 `[scripts/resolve-route.ts]` 渲染为上方文件名顶栏。此外也可对单块附加 `:no-line-numbers` 局部关闭行号。
:::

## 2. 关键行聚焦与高亮（Line Highlighting）

派生自标准 GFM 母版时，VitePress 原生支持紧贴语言标识的 `{3,7-9}` 行号区间语法（或使用 Shiki 魔法注释 `// [!code highlight]`），自动为第 `3` 行与第 `7–9` 行注入 `.highlighted` 高亮背景：

```json{3,7-9}
{
  "id": "ssg-benchmark",
  "routeStyle": "clean",
  "strictZeroCdn": true,
  "markdown": {
    "mathEngine": "katex",
    "diagramEngine": "mermaid",
    "lineHighlight": true,
    "codeTransformers": ["diff", "focus"]
  }
}
```

## 3. 保留 TypeScript 词法着色的行级 Diff

标准 GFM 的 ```` ```diff ```` 代码块会丢失底层 TypeScript 关键字与类型着色。VitePress v1 内置 `@shikijs/transformers` 的 `transformerNotationDiff`，只需在 `ts` 代码块尾追加 `// [!code --]` 与 `// [!code ++]`（这些魔法注释在编译产物中会被自动剥离），即可同时保留 TS 语法高亮与红绿增删对比背景：

```ts
export function mountSubsite(baseDir: string, subPath: string): string | null {
  const cleanRel = decodeURIComponent(subPath).replace(/\.\./g, '') // [!code --]
  return `${baseDir}/${cleanRel}` // [!code --]
  const resolvedBase = path.resolve(baseDir) // [!code ++]
  const target = path.resolve(resolvedBase, decodeURIComponent(subPath).replace(/^\/+/, '')) // [!code ++]
  return target.startsWith(`${resolvedBase}${path.sep}`) ? target : null // [!code ++]
}
```

## 4. 多语言运行时命令组（`::: code-group`）

无需像 MDX 框架那样手动 `import { Tabs, TabItem }`，VitePress v1 原生通过 `::: code-group` 容器自动提取每个围栏代码块 `[标签名]` 生成无障碍切换栏：

::: code-group

```bash [Node.js (package.json)]
npm ci && npm run build
```

```bash [Deno 2 (deno.json)]
deno task build
```

```bash [Python (requirements.txt)]
pip install -r requirements.txt && sphinx-build -b dirhtml . _build/dirhtml
```

```bash [Ruby (Gemfile)]
bundle install && bundle exec jekyll build
```

:::

## 5. 四大底层高亮引擎能力对照小结

| 高亮引擎代表 | 典型采用框架 | 构建期零运行时 JS | 原生行号 / 行高亮 | 保留词法着色的 Diff |
| :--- | :--- | :--- | :--- | :--- |
| **Shiki / Expressive Code** | **VitePress v1/v2**、VuePress v2、Starlight、Fumadocs、Nuxt | ✅ 纯静态内联 CSS 变量 | ✅ `{3,7-9}` / `[!code highlight]` | ✅ `// [!code ++]` |
| **Prism.js** | Docusaurus、VuePress v1、Eleventy (plugin) | ✅ 静态 Token 类名 | ✅ `{3,7-9}` / 魔法注释 | ⚠️ 需配 diff-highlight 插件 |
| **Pygments / Rouge** | MkDocs Material、Sphinx、Pelican、Jekyll | ✅ Python/Ruby 编译直出 | ✅ `hl_lines` / `emphasize-lines` | ⚠️ 仅标准 `diff` 块红绿 |
| **Chroma / Giallo / hljs** | Hugo (Go Chroma)、Zola (Rust Giallo)、mdBook (hljs) | ✅ (mdBook 为客户端 hljs) | ✅ Hugo/Zola 原生 `hl_lines` | ⚠️ 仅标准 `diff` 块红绿 |
