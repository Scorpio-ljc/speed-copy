<template>
  <textarea v-model="store.code" :style="editorStyle" @input="onInput" style="width: 100%; height: 100%; resize: none; font-family: 'Fira Mono', 'Consolas', monospace;"></textarea>
</template>
<script setup>
import { computed } from 'vue'
import { useMainStore } from '../store/main'
const store = useMainStore()
const editorStyle = computed(() => ({
  fontSize: store.fontSize + 'px',
  lineHeight: '1.6',
  background: '#1e1e1e',
  color: '#fff',
  border: 'none',
  outline: 'none',
  padding: '12px',
  boxSizing: 'border-box',
  fontFamily: 'Fira Mono, Consolas, monospace',
  whiteSpace: store.wordWrap ? 'pre-wrap' : 'pre',
}))
function onInput() {
  store.syncCode()
}
</script> 