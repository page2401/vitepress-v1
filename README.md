# page2401/vitepress-v1

独立静态站点对比子模块 —— **VitePress v1 (`1.6.4`)**。

- **线上预览地址**：`https://page.2401.xyz/vitepress-v1/`
- **对比总站地址**：`https://page.2401.xyz/`
- **分支模型**：
  - `main`：仅保存纯工程源码与适配版 `*.md` 基准文档（挂载为主仓库 `sites/vitepress-v1` 子模块）
  - `page`：由 GitHub Actions 自动构建并强制覆盖的纯静态产物孤儿分支（供 GitHub Pages 发布）

## 精确锁定依赖版本

- `vitepress`: `1.6.4`
- `markdown-it-mathjax3`: `4.3.2`
- `vitepress-plugin-mermaid`: `2.0.17`
- `mermaid`: `11.17.2`

## 本地开发与独立部署

```bash
npm install
npm run dev      # 本地开发预览
npm run build    # 构建至 .vitepress/dist (默认 base: /vitepress-v1/)

# 如需部署到独立根域名（如 Cloudflare Pages）：
BASE_PATH=/ npm run build
```
