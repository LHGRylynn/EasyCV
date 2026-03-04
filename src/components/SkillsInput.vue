<template>
  <div class="skills-input-container">
    <div class="skills-input">
      <a-tag
        v-for="(skill, index) in localSkills"
        :key="index"
        size="large"
        closable
        @close="removeSkill(index)"
      >
        {{ skill }}
      </a-tag>
      <a-tag class="site-tag-plus" @click="showInput">
        <plus-outlined />
        添加技能
      </a-tag>
    </div>
    <a-input
      v-if="inputVisible"
      ref="inputRef"
      v-model:value="newSkill"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  skills: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:skills'])

const localSkills = ref([...props.skills])
const newSkill = ref('')
const inputVisible = ref(false)
const inputRef = ref(null)

// 监听props变化，更新本地数据
watch(() => props.skills, (newSkills) => {
  localSkills.value = [...newSkills]
}, { deep: true })

// 显示输入框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 处理输入确认
const handleInputConfirm = () => {
  const skill = newSkill.value.trim()
  if (skill && !localSkills.value.includes(skill)) {
    localSkills.value.push(skill)
    emit('update:skills', localSkills.value)
  }
  newSkill.value = ''
  inputVisible.value = false
}

// 删除技能
const removeSkill = (index) => {
  localSkills.value.splice(index, 1)
  emit('update:skills', localSkills.value)
}
</script>

<style scoped>
.skills-input {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.site-tag-plus {
  background: #fff;
  border-style: dashed;
  cursor: pointer;
}
</style>
