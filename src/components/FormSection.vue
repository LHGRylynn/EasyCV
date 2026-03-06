<template>
  <div class="form-section">
    <!-- 基础信息 -->
    <h2 class="section-title">基础信息</h2>
    <div class="form-group">
      <label for="name">姓名</label>
      <a-input v-model:value="localFormData.basic.name" @input="updateFormData" />
    </div>
    <div class="form-group">
      <label for="title">职位</label>
      <a-input v-model:value="localFormData.basic.title" @input="updateFormData" />
    </div>
    <div class="form-group">
      <label for="email">邮箱</label>
      <a-input v-model:value="localFormData.basic.email" @input="updateFormData" />
    </div>
    <div class="form-group">
      <label for="phone">电话</label>
      <a-input v-model:value="localFormData.basic.phone" @input="updateFormData" />
    </div>
    <div class="form-group">
      <label for="summary">个人简介</label>
      <a-textarea v-model:value="localFormData.basic.summary" @input="updateFormData" />
    </div>
    <div class="form-group">
      <label for="photo">个人照片</label>
      <a-upload name="avatar" accept="image/*" list-type="picture-card" :before-upload="beforeUpload" :show-upload-list="false"
        @change="handlePhotoUpload">
        <div v-if="localFormData.basic.photo" style="width: 100%; height: 100%; ">
          <img :src="localFormData.basic.photo" alt="个人照片"
            style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover;" />
        </div>
        <div v-else>
          <plus-outlined />
          <div style="margin-top: 8px">上传</div>
        </div>
      </a-upload>
    </div>

    <!-- 教育经历 -->
    <h2 class="section-title">教育经历</h2>
    <div v-for="(edu, index) in localFormData.education" :key="index" class="item-card">
      <div class="item-header">
        <span class="item-title">教育经历 {{ index + 1 }}</span>
        <a-button danger @click="removeEducation(index)">
          删除
        </a-button>
      </div>
      <div class="form-group">
        <label for="school">学校</label>
        <a-input v-model:value="edu.school" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="degree">学位</label>
        <a-input v-model:value="edu.degree" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="major">专业</label>
        <a-input v-model:value="edu.major" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="start">开始年份</label>
        <a-input v-model:value="edu.start" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="end">结束年份</label>
        <a-input v-model:value="edu.end" @input="updateFormData" />
      </div>
    </div>
    <a-button type="primary" @click="addEducation">添加教育经历</a-button>

    <!-- 工作/项目经历 -->
    <h2 class="section-title">工作/项目经历</h2>
    <div v-for="(exp, index) in localFormData.experience" :key="index" class="item-card">
      <div class="item-header">
        <span class="item-title">经历 {{ index + 1 }}</span>
        <a-button danger @click="removeExperience(index)">
          删除
        </a-button>
      </div>
      <div class="form-group">
        <label for="company">公司/项目名称</label>
        <a-input v-model:value="exp.company" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="position">职位</label>
        <a-input v-model:value="exp.position" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="start">开始时间</label>
        <a-input v-model:value="exp.start" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label for="end">结束时间</label>
        <a-input v-model:value="exp.end" @input="updateFormData" />
      </div>
      <div class="form-group">
        <label>描述</label>
        <div v-for="(desc, descIndex) in exp.descriptions" :key="descIndex" class="description-item">
          <div class="description-content">
            <a-input v-model:value="desc.title" @input="updateFormData" placeholder="小标题" class="description-title" />
            <a-textarea v-model:value="desc.content" @input="updateFormData" placeholder="详细描述"
              class="description-text" />
          </div>
          <a-button danger @click="removeDescription(exp, descIndex)">
            删除
          </a-button>
        </div>
        <a-button type="primary" @click="addDescription(exp)">添加描述</a-button>
      </div>
    </div>
    <a-button type="primary" @click="addExperience">添加经历</a-button>

    <!-- 技能标签 -->
    <h2 class="section-title">技能标签</h2>
    <SkillsInput v-model:skills="localFormData.skills" @update:skills="handleSkillsUpdate" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import SkillsInput from './SkillsInput.vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:formData'])

const localFormData = ref(props.formData)

// 更新表单数据并触发事件
const updateFormData = () => {
  emit('update:formData', localFormData.value)
}

// 添加教育经历
const addEducation = () => {
  localFormData.value.education.push({
    school: '',
    degree: '',
    major: '',
    start: '',
    end: ''
  })
  updateFormData()
}

// 删除教育经历
const removeEducation = (index) => {
  localFormData.value.education.splice(index, 1)
  updateFormData()
}

// 添加工作/项目经历
const addExperience = () => {
  localFormData.value.experience.push({
    company: '',
    position: '',
    start: '',
    end: '',
    descriptions: [{ title: '', content: '' }]
  })
  updateFormData()
}

// 删除工作/项目经历
const removeExperience = (index) => {
  localFormData.value.experience.splice(index, 1)
  updateFormData()
}

// 阻止自动上传
const beforeUpload = (file) => {
  return false
}

// 处理照片上传
const handlePhotoUpload = (info) => {
  const file = info.file;

  if (file && (file instanceof File || file.name)) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localFormData.value.basic.photo = e.target.result
      updateFormData()
    }

    if (file instanceof File) {
      reader.readAsDataURL(file)
    }
  }
}

// 添加描述
const addDescription = (exp) => {
  exp.descriptions.push({ title: '', content: '' })
  updateFormData()
}

// 删除描述
const removeDescription = (exp, index) => {
  exp.descriptions.splice(index, 1)
  updateFormData()
}

// 处理技能更新
const handleSkillsUpdate = (skills) => {
  localFormData.value.skills = skills
  updateFormData()
}
</script>

<style scoped>
/* 组件特定样式 */
.description-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.description-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description-title {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.description-text {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
}

.description-item button {
  white-space: nowrap;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  align-self: flex-start;
  margin-top: 0.25rem;
}
</style>