<template>
<!-- 搜索框 -->
    <div class="container-search">
      <span class="iconfont container-search_iconfont">&#xe64c;</span>
      <input
        type="text"
        class="container-search_input"
        placeholder="山姆会员商店优惠商品"
      />
    </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.container-search {
    text-align: center;
    position: relative;
    color: #b7b7b7;
    &_input {
      background: #f5f5f5;
      border-radius: 16rem;
      width: 339rem;
      height: 32rem;
      padding-left: 44rem;
      box-sizing: border-box;
      &::-webkit-input-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
      &:-moz-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
      &::-moz-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
      &:-ms-input-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
    }
    &_iconfont {
      position: absolute;
      left: 34rem;
      top: 6rem;
      font-size: 16rem;
    }
  }
</style>
