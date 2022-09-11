<template>
  <!-- 搜索框 -->
  <div class="container-nearby">
    <div class="container-nearby_title">附近店铺</div>
    <router-link :to="`/shop/${item.id}`"
                 v-for="item of nearbyData"
                 :key="item.id">
      <ShopInfo :item="item"
                :showBorder="true" />
    </router-link>
    <!-- <div class="container-nearby_item"
         v-for="item of nearbyData"
         :key="item.id">
      <div class="container-nearby_item_left">
        <img class="container-nearby_item_left_img"
             :src="item.imgUrl"
             alt="" />
      </div>
      <div class="container-nearby_item_right">
        <div class="container-nearby_item_right_title">{{ item.title }}</div>
        <div class="container-nearby_item_right_tags">
          <div class="container-nearby_item_right_tags-item">
            {{ item.tags[0] }}
          </div>
          <div class="container-nearby_item_right_tags-item">
            {{ item.tags[1] }}
          </div>
          <div class="container-nearby_item_right_tags-item">
            {{ item.tags[2] }}
          </div>
        </div>
        <div class="container-nearby_item_right_notice">
          {{ item.notice }}
        </div>
      </div>
    </div> -->
  </div>
  <Toast v-if="isShow"
         :message="toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Toast, { showToastEffect } from '../../components/Toast.vue'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearbyEffect = (showToast) => {
  const nearbyData = ref([])
  const getnearbyData = async () => {
    try {
      // 走接口, 获取数据
      const result = await get('/home/nearby')
      if (result.data.code === '0000') {
        nearbyData.value = result.data.data
      } else {
        showToast('获取数据失败')
      }
    } catch (error) {
      showToast('请求接口失败!!!')
    }
  }
  getnearbyData()
  return { nearbyData }
}

export default {
  name: 'Nearby',
  components: { Toast, ShopInfo },
  setup () {
    const { isShow, toastMessage, showToast } = showToastEffect()
    const { nearbyData } = useNearbyEffect(showToast)
    return { nearbyData, isShow, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variables.scss";
.container-nearby {
  padding: 16rem 18rem;
  &_title {
    font-family: $font-Regular;
    font-size: 18rem;
    color: $content-fontcolor;
    margin-bottom: 14rem;
  }
  /*   &_item {
    display: flex;
    margin-bottom: 12rem;
    &_left {
      margin-right: 16rem;
      &_img {
        width: 56rem;
        height: 56rem;
      }
    }
    &_right {
      border-bottom: 1rem solid #f1f1f1;
      flex-grow: 1;
      &_title {
        font-family: $font-Regular;
        font-size: 16rem;
        color: $content-fontcolor;
        margin-bottom: 8rem;
      }
      &_tags {
        margin-bottom: 8rem;
        display: flex;
        &-item {
          font-family: $font-Regular;
          font-size: 13rem;
          color: $content-fontcolor;
          margin-right: 16rem;
        }
      }
      &_notice {
        font-family: $font-Regular;
        font-size: 13rem;
        color: #e93b3b;
        margin-bottom: 12rem;
      }
    }
  } */
}
</style>
