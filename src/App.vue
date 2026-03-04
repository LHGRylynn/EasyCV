<template>
  <a-config-provider :theme="themeConfig">
    <a-layout class="layout">
      <a-layout-header class="header">
        <h1>📄 简历生成器</h1>
        <div class="btn-group">
          <a-button type="primary" @click="exportPDF">下载PDF</a-button>
          <a-button @click="exportMarkdown">导出Markdown</a-button>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="app-container">
          <FormSection 
            v-model:formData="formData"
            @update:formData="saveToLocalStorage"
          />
          <Preview :formData="formData" ref="previewRef" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import FormSection from './components/FormSection.vue'
import Preview from './components/Preview.vue'
import { exportPDF as exportPDFUtil } from './utils/exportPDF.js'
import { generateMarkdown } from './utils/markdownTemplate.js'

// antd 主题配置 - 竹林风格
const themeConfig = {
  token: {
    // 主色调 - 墨水墨绿
    colorPrimary: '#2d5016',
    colorSuccess: '#3a6b1f',
    colorWarning: '#a87c00',
    colorError: '#8b3a3a',
    colorInfo: '#2d5016',
    
    // 背景色 - 竹林层次感
    colorBgBase: '#f7f9f4',          // 整体背景 - 极淡绿
    colorBgContainer: '#ffffff',      // 容器背景 - 白色
    colorBgElevated: '#ffffff',       // 浮层背景
    colorBgLayout: '#f0f5e6',        // 布局背景 - 淡绿
    
    // 文本颜色 - 深绿色调
    colorTextBase: '#1a2e0d',        // 主要文本 - 深绿黑
    colorTextSecondary: '#2d5016',    // 次要文本 - 墨绿
    colorTextTertiary: '#3a6b1f',    // 第三级文本
    colorTextQuaternary: '#9ca3af',  // 第四级文本 - 灰色
    
    // 边框和分割线 - 淡绿色
    colorBorder: '#c9d8ba',          // 边框颜色
    colorBorderSecondary: '#e8f0e0',  // 次要边框
    colorSplit: '#e8f0e0',           // 分割线
    
    // 圆角
    borderRadius: 8,
    borderRadiusSM: 4,
    borderRadiusLG: 12,
    
    // 字体
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    
    // 按钮配置
    controlHeight: 36,
    controlHeightSM: 28,
    controlHeightLG: 44,
    
    // 间距
    paddingXS: 8,
    paddingSM: 12,
    padding: 16,
    paddingLG: 24,
    paddingXL: 32,
    
    // 阴影 - 绿色调阴影
    boxShadow: '0 2px 8px rgba(45, 80, 22, 0.1)',
    boxShadowSecondary: '0 4px 16px rgba(45, 80, 22, 0.15)',
    
    // 列表背景
    colorBgList: '#ffffff',
    colorBgListHover: '#f7f9f4',
    colorBgListSelected: '#e8f0e0',
    
    // 标题背景
    colorBgHeader: '#ffffff',
    colorBgHeaderHover: '#f7f9f4',
    
    // 链接颜色
    colorLink: '#2d5016',
    colorLinkHover: '#3a6b1f',
    colorLinkActive: '#1a2e0d',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f0f5e6',
      headerHeight: 64,
      headerPadding: '0 24px',
    },
    Button: {
      colorPrimary: '#2d5016',
      colorPrimaryHover: '#3a6b1f',
      colorPrimaryActive: '#1a2e0d',
      borderRadius: 6,
      controlHeight: 36,
      fontSize: 14,
    },
    Input: {
      colorBorder: '#c9d8ba',
      colorBgContainer: '#ffffff',
      activeBorderColor: '#2d5016',
      hoverBorderColor: '#3a6b1f',
      borderRadius: 6,
      controlHeight: 36,
    },
    Textarea: {
      colorBorder: '#c9d8ba',
      colorBgContainer: '#ffffff',
      activeBorderColor: '#2d5016',
      hoverBorderColor: '#3a6b1f',
      borderRadius: 6,
    },
    Tag: {
      colorPrimary: '#2d5016',
      colorBgContainer: '#f7f9f4',
      borderRadiusSM: 4,
    },
    Card: {
      colorBgContainer: '#ffffff',
      borderRadiusLG: 12,
      boxShadow: '0 2px 8px rgba(45, 80, 22, 0.1)',
    },
    List: {
      colorBgContainer: '#ffffff',
      colorBgItemHover: '#f7f9f4',
    },
  },
}

// 初始化表单数据
const formData = reactive({
  basic: {
    name: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
    photo: ''
  },
  education: [
    { school: '', degree: '', major: '', start: '', end: '' }
  ],
  experience: [
    { company: '', position: '', start: '', end: '', descriptions: [{ title: '', content: '' }] }
  ],
  skills: []
})

const previewRef = ref(null)

// 从localStorage加载数据
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('resumeData')
  if (savedData) {
    const parsedData = JSON.parse(savedData)
    Object.assign(formData, parsedData)
  }
}

// 保存数据到localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('resumeData', JSON.stringify(formData))
}

// 导出PDF
const exportPDF = () => {
  if (previewRef.value) {
    const previewElement = previewRef.value.getEl()
    if (previewElement) {
      exportPDFUtil(previewElement)
    } else {
      console.error('Preview element not found')
      alert('预览元素未找到，请确保预览区域已加载')
    }
  } else {
    console.error('Preview component not found')
    alert('预览组件未找到，请刷新页面重试')
  }
}

// 导出Markdown
const exportMarkdown = () => {
  const markdown = generateMarkdown(formData)
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'resume.md'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 组件挂载时加载数据
onMounted(() => {
  loadFromLocalStorage()
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #497928b0;
  border-bottom: 1px solid #c9d8ba;
  padding: 0 24px;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.content {
  padding: 24px;
  background: #ffffffd8;
  /* background: #f0f5e6; */
}

.app-container {
  display: flex;
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}
</style>
