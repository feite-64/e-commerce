<template>
  <!-- src\components\Toast.vue -->
  <div class="toast">{{ message }}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message'],
  name: 'Toast'
}
// 封装
export const showToastEffect = () => {
  const toastData = reactive({
    isShow: false,
    toastMessage: ''
  })
  const { isShow, toastMessage } = toRefs(toastData)
  const showToast = (message) => {
    toastData.isShow = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.isShow = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return { isShow, toastMessage, showToast }
}
</script>
<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.35);
  padding: 10rem;
  border-radius: 5rem;
  color: #fff;
}
</style>
