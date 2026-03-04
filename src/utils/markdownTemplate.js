/**
 * 生成简历的 Markdown 模板
 * @param {Object} data - 简历数据
 * @returns {string} - 生成的 Markdown 字符串
 */
export const generateMarkdown = (data) => {
  const { basic, education, experience, skills } = data

  // 基础信息
  let markdown = ``
  
  // 添加照片（如果有）
  if (basic.photo) {
    markdown += `![个人照片](${basic.photo})\n\n`
  }
  
  markdown += `# ${basic.name} | ${basic.title}\n\n`
  markdown += `${basic.email} | ${basic.phone}\n\n`
  markdown += `---\n\n`

  // 个人简介
  if (basic.summary) {
    markdown += `## 个人简介\n${basic.summary}\n\n`
    markdown += `---\n\n`
  }

  // 教育经历
  if (education.length > 0) {
    markdown += `## 教育经历\n`
    education.forEach(edu => {
      if (edu.school) {
        markdown += `### ${edu.school} | ${edu.degree} | ${edu.start} - ${edu.end}\n`
        if (edu.major) {
          markdown += `专业：${edu.major}\n`
        }
        markdown += `\n`
      }
    })
    markdown += `---\n\n`
  }

  // 工作/项目经历
  if (experience.length > 0) {
    markdown += `## 工作/项目经历\n`
    experience.forEach(exp => {
      if (exp.company) {
        markdown += `### ${exp.company} | ${exp.position} | ${exp.start} - ${exp.end}\n`
        if (exp.descriptions && exp.descriptions.length > 0) {
          // 处理描述内容，每个描述点包含标题和内容
          exp.descriptions.forEach(desc => {
            if (desc.title || desc.content) {
              // 如果有标题，显示为小标题
              if (desc.title) {
                markdown += `#### ${desc.title}\n`
              }
              // 如果有内容，显示为内容
              if (desc.content) {
                const lines = desc.content.split('\n')
                lines.forEach(line => {
                  const trimmedLine = line.trim()
                  if (trimmedLine) {
                    markdown += `${trimmedLine}\n`
                  }
                })
              }
              markdown += `\n`
            }
          })
        }
        markdown += `\n`
      }
    })
    markdown += `---\n\n`
  }

  // 技能
  if (skills.length > 0) {
    markdown += `## 技能\n`
    markdown += `${skills.join('、')}\n\n`
  }

  return markdown
}