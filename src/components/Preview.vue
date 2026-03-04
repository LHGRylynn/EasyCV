<template>
  <div class="preview-section" :class="{ expanded: isExpanded }" @click="toggleExpand">
    <div class="preview-card" ref="previewContent">
      <div class="preview-content" v-html="renderedHtml"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineExpose } from 'vue'
import { generateMarkdown } from '../utils/markdownTemplate.js'
import { renderMarkdown } from '../utils/renderMarkdown.js'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const previewContent = ref(null)
const isExpanded = ref(false)

// 暴露 previewContent 给父组件
defineExpose({
  getEl: () => previewContent.value
})

// 切换预览窗口大小
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 计算生成的 Markdown
const markdown = computed(() => {
  return generateMarkdown(props.formData)
})

// 计算渲染后的 HTML
const renderedHtml = computed(() => {
  return renderMarkdown(markdown.value)
})
</script>

<style scoped>
.preview-card {
  position: relative;
}
</style>
