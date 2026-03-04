import { marked } from 'marked'

/**
 * 将 Markdown 渲染为 HTML
 * @param {string} markdown - Markdown 字符串
 * @returns {string} - 渲染后的 HTML 字符串
 */
export const renderMarkdown = (markdown) => {
  // 配置 marked 选项
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  return marked(markdown)
}