<template>
  <div>
    <div v-for="item in store.history" :key="item.id" style="background: #fff; border-radius: 6px; margin-bottom: 12px; box-shadow: 0 1px 4px #0001; padding: 8px 12px;">
      <div style="font-size: 12px; color: #888; margin-bottom: 4px;">ID:{{ item.id }}</div>
      <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 8px; border-radius: 4px;">{{ item.code }}</pre>
      <div style="display: flex; gap: 8px; margin-top: 4px;">
        <button @click="del(item.id)" style="color: #f56c6c;">删除</button>
        <button @click="copy(item.code)">复制</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMainStore } from '../store/main'
const store = useMainStore()
function edit(item) {
  store.edit(item)
}
function del(id) {
  store.deleteHistory(id)
}
function copy(text) {
  navigator.clipboard.writeText(text)
}
</script> 