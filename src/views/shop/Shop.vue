<template>
  <div class="container">
    <div class="container__header">
      <!-- src\views\shop\Shop.vue -->
      <div class="container__header__left">
        <span @click="handleBackClick"
              class="container__header__left__iconfont">
          &#xe600;
        </span>
      </div>
      <div class="container__header__right">
        <span class="container__header__right__iconfont">&#xe64c;</span>
        <input type="text"
               class="container__header__right__input"
               placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <!--  防止裂图 -->
    <ShopInfo :item="item"
              :showBorder="false"
              v-if="item.imgUrl" />
    <Content :shopName="item.title" />
    <Cart :shopName="item.title" />
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import ShopInfo from '../../components/ShopInfo.vue'
import { ref } from 'vue'
import { get } from '../../utils/request'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { useBackRouterEffect } from '../../effects/backEffect'
const useShopInfoEffect = () => {
  const item = ref({})
  const route = useRoute()
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    item.value = result.data.data
  }
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 18rem;
}
.container__header {
  width: 100%;
  height: 32rem;
  margin-top: 16rem;
  margin-bottom: 16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container__header__left__iconfont {
  color: #b6b6b6;
  font-size: 20rem;
}
.container__header__right {
  position: relative;
}
.container__header__right__iconfont {
  color: #b7b7b7;
  font-size: 18rem;
  position: absolute;
  top: 6rem;
  left: 16rem;
}
.container__header__right__input {
  width: 310rem;
  height: 32rem;
  background: #f5f5f5;
  border-radius: 16rem;
  padding: 0 44rem;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-size: 14rem;
  color: #333333;
  line-height: 16rem;
}
</style>
