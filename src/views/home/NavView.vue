
<template>
  <!-- 菜单栏 -->
  <div class="container-nav">
    <div class="container-nav_item"
         v-for="(item,index) of navData"
         :key="index">
      <img :src="item.imgUrl"
           alt="医药健康"
           class="container-nav_item_img" />
      <span class="container-nav_item_text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  setup () {
    const navData = [
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      },
      {
        imgUrl: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
        text: '超市便利'
      }
    ]
    return { navData }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variables.scss";
.container-nav {
  display: flex;
  flex-wrap: wrap;
  padding: 16rem;
  &_item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16rem;
    &_img {
      width: 40rem;
      height: 40rem;
      margin-bottom: 6rem;
    }
    &_text {
      font-family: $font-Regular;
      color: $content-fontcolor;
    }
  }
}
</style>
