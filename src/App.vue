<template>
  <div style="height: 100vh; display: flex; flex-direction: column;">
    <div style="display: flex; align-items: center; padding: 8px; background: #222; color: #fff;">
      <Toolbar />
    </div>
    <div style="flex: 1; display: flex; overflow: hidden;">
      <div style="flex: 1; border-right: 1px solid #eee; display: flex; flex-direction: column;">
        <Editor />
      </div>
      <div style="width: 480px; background: #fafbfc; overflow-y: auto; padding: 8px;">
        <HistoryList />
      </div>
    </div>
    <div style="padding: 8px; background: #f5f5f5; display: flex; gap: 8px;">
      <button @click="save" style="background: #409eff; color: #fff; border: none; padding: 8px 16px; border-radius: 4px;">发布</button>
      <button @click="clearHistory" style="background: #f56c6c; color: #fff; border: none; padding: 8px 16px; border-radius: 4px;">清空数据库</button>
    </div>
    <template v-if="showTip">
      <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #67c23a; color: #fff; padding: 10px 24px; border-radius: 6px; z-index: 9999; font-size: 16px;">发布成功</div>
    </template>
  </div>
</template>

<script setup>
import Toolbar from './components/Toolbar.vue'
import Editor from './components/Editor.vue'
import HistoryList from './components/HistoryList.vue'
import { useMainStore } from './store/main'
import { ref } from 'vue'

const store = useMainStore()
const showTip = ref(false)

function save() {
  store.publish()
  store.code = ''
  showTip.value = true
  setTimeout(() => showTip.value = false, 1500)
}
function clearHistory() {
  store.clearHistory()
}
</script> 