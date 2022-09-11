
<template>
  <!-- 头部 -->
  <div class="container-header">
    <div class="container-header_left">
      <span class="container-header_left_position-iconfont"> &#xe67e; </span>
      <span class="container-header_left_position-text">
        北京理工大学国防科技园2号楼10层
      </span>
    </div>
    <div class="container-header_right">
      <span class="container-header_right_notice-iconfont"> &#xe7f1; </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.container-header {
  display: flex;
  padding: 16rem 19.2rem;
  justify-content: space-between;
  &_left {
    width: 310rem;
    //文本多余省略...
    @include ellipsis;
    &_position-iconfont {
      margin-right: 9.7rem;
      font-size: 18rem;
    }
    &_position-text {
      font-size: 16rem;
      font-family: PingFangSC-Regular;
      color: $content-fontcolor;
    }
  }
  &_right_notice-iconfont {
    font-size: 20rem;
  }
}
</style>
