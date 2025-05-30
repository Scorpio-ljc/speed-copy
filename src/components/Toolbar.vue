<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <select v-model="store.language" @change="onChange">
      <option v-for="lang in langs" :key="lang" :value="lang">{{ lang }}</option>
    </select>
    <select v-model="store.fontSize" @change="onChange">
      <option v-for="size in fontSizes" :key="size" :value="size">{{ size }}px</option>
    </select>
    <label><input type="checkbox" v-model="store.showLineNumbers" @change="onChange" /> 显示行号</label>
    <label><input type="checkbox" v-model="store.wordWrap" @change="onChange" /> 自动换行</label>
  </div>
</template>
<script setup>
import { useMainStore } from '../store/main'
const store = useMainStore()
const langs = ['Go', 'Java', 'C#', 'PHP', 'Ruby', 'TypeScript', 'SQL', 'JSON', 'XML']
const fontSizes = [12, 14, 16, 18, 20, 24]
function onChange() {
  store.syncConfig()
}
</script> 