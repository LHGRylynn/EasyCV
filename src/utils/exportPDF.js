/**
 * 导出预览内容为 PDF
 * @param {HTMLElement} element - 要导出的 HTML 元素
 */
export const exportPDF = (element) => {
  if (!element) {
    console.error('No element provided for PDF export')
    return
  }

  // 尝试使用浏览器打印功能
  try {
    // 创建一个临时窗口
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('请允许弹出窗口以导出 PDF')
      return
    }

    // 获取预览内容的 HTML
    const content = element.innerHTML

    // 构建打印页面
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>简历</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.5;
            color: #213547;
            margin: 20px;
          }
          h1 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            color: #333;
          }
          h2 {
            font-size: 1.25rem;
            margin: 1.5rem 0 1rem;
            color: #333;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 0.5rem;
          }
          h3 {
            font-size: 1.125rem;
            margin: 1rem 0 0.5rem;
            color: #333;
          }
          p {
            margin-bottom: 1rem;
          }
          ul {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
          hr {
            border: none;
            border-top: 1px solid #e0e0e0;
            margin: 1.5rem 0;
          }
          img {
            width: 120px;
            height: 160px;
            object-fit: cover;
            border-radius: 4px;
            float: right;
            margin-left: 1rem;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `)
    printWindow.document.close()

    // 等待页面加载完成后打印
    printWindow.onload = () => {
      printWindow.print()
      // 打印完成后关闭窗口
      setTimeout(() => {
        printWindow.close()
      }, 1000)
    }
  } catch (error) {
    console.error('Error exporting PDF:', error)
    alert('导出 PDF 时出错，请重试')
  }
}