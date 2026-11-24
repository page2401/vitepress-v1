import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const rawBase = process.env.BASE_PATH || '/vitepress-v1/'
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'VitePress v1 (1.6.4)',
    description: 'SSG 多版本实测基准子站 — VitePress 1.6.4 + MathJax 3 + Mermaid 11',
    base,
    srcExclude: ['README.md'],
    cleanUrls: true,
    lastUpdated: false,
    markdown: {
      math: true,
      lineNumbers: true
    },
    mermaid: {
      securityLevel: 'loose'
    },
    themeConfig: {
      siteTitle: 'VitePress v1 · 1.6.4',
      nav: [
        { text: '← 返回对比总站', link: 'https://page.2401.xyz/' },
        { text: '01. 标注', link: '/01-annotations' },
        { text: '02. 流程图', link: '/02-diagrams' },
        { text: '03. 公式', link: '/03-math' },
        { text: '04. 目录结构', link: '/04-directory/' },
        { text: '05. 代码高亮', link: '/05-code-blocks' }
      ],
      sidebar: [
        {
          text: 'VitePress v1 基准套件',
          items: [
            { text: '00. 版本与基准概览', link: '/' },
            { text: '01. 专属标注与元数据', link: '/01-annotations' },
            { text: '02. 流程图与时序图', link: '/02-diagrams' },
            { text: '03. 数学公式排版', link: '/03-math' },
            {
              text: '04. 目录结构与路由取舍',
              collapsed: false,
              items: [
                { text: '不可能三角总览', link: '/04-directory/' },
                {
                  text: 'nested 子目录（手写配置）',
                  collapsed: false,
                  items: [
                    { text: 'A. 文件名前缀排序代价', link: '/04-directory/nested/01-prefix-order' },
                    { text: 'B. 手写侧边栏与孤岛页', link: '/04-directory/nested/02-manual-sidebar' }
                  ]
                }
              ]
            },
            { text: '05. 高阶代码块与语法高亮', link: '/05-code-blocks' }
          ]
        }
      ],
      outline: {
        level: [2, 3],
        label: '本页目录'
      },
      search: {
        provider: 'local'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/page2401/vitepress-v1' }
      ],
      footer: {
        message: '独立子模块仓库 page2401/vitepress-v1 · main 存源码 / page 发产物',
        copyright: 'page.2401.xyz Static Site Generator Benchmark'
      }
    }
  })
)
