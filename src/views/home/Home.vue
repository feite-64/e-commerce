<template>
  <div class="container">
    <!-- 头部 -->
    <Header />
    <!-- 搜索框 -->
    <Search />
    <!-- 横幅 -->
    <Banner />
    <!-- 菜单栏 -->
    <Nav />
    <!-- 分隔线 -->
    <div class="container-gap"></div>
    <!-- 附近商店 -->
    <Nearby />
    <!-- dibudaohangcaidan   -->
    <Docker tag='home'/>
  </div>
</template>
<script>
import Header from './Header.vue'
import Search from './Search.vue'
import Banner from './Banner.vue'
import Nav from './NavView.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: { Banner, Header, Search, Nav, Nearby, Docker }
}
</script>
<style lang="scss">
@import '../../style/mixins.scss';
@import '../../style/variables.scss';
.container {
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  &-gap {
    width: 375rem;
    height: 10rem;
    background-color: #f1f1f1;
  }
}
</style>
