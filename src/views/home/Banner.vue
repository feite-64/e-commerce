
<template>
  <!-- 横幅 -->
  <div class="container-banner">
    <img
      class="container-banner_img"
      src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202191609589.png"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.container-banner {
  height: 98rem;
  text-align: center;
  margin-top: 12rem;
  &_img {
    width: 339rem;
    height: 86rem;
  }
}
</style>
