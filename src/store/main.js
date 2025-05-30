import { defineStore } from 'pinia'
import { ref } from 'vue'
import { io } from 'socket.io-client'

export const useMainStore = defineStore('main', () => {
  const code = ref('')
  const language = ref('Go')
  const fontSize = ref(14)
  const showLineNumbers = ref(true)
  const wordWrap = ref(false)
  const history = ref([])
  let socket

  function connect() {
    const socketUrl = import.meta.env.PROD ? window.location.origin : 'http://localhost:3000'
    socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })

    socket.on('connect', () => {
      console.log('Socket connected successfully')
    })

    socket.on('init', (data) => {
      code.value = data.code
      language.value = data.language
      fontSize.value = data.fontSize
      showLineNumbers.value = data.showLineNumbers
      wordWrap.value = data.wordWrap
      history.value = data.history
    })
    socket.on('update', (data) => {
      code.value = data.code
      language.value = data.language
      fontSize.value = data.fontSize
      showLineNumbers.value = data.showLineNumbers
      wordWrap.value = data.wordWrap
      history.value = data.history
    })
  }

  function syncCode() {
    socket.emit('update', { code: code.value })
  }
  function syncConfig() {
    socket.emit('update', {
      language: language.value,
      fontSize: fontSize.value,
      showLineNumbers: showLineNumbers.value,
      wordWrap: wordWrap.value,
    })
  }
  function publish() {
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      code: code.value,
      language: language.value,
      time: new Date().toLocaleString(),
    }
    socket.emit('publish', item)
  }
  function deleteHistory(id) {
    socket.emit('delete', id)
  }
  function clearHistory() {
    socket.emit('clear')
  }
  function edit(item) {
    code.value = item.code
    language.value = item.language
  }

  connect()

  return {
    code, language, fontSize, showLineNumbers, wordWrap, history,
    syncCode, syncConfig, publish, deleteHistory, clearHistory, edit
  }
}) 