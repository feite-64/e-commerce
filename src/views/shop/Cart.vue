<template>
  <div v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
       class="mask"></div>
  <div class="cart">
    <div v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
         class="cart_header">
      <div class="cart_header_left">
        <div v-if="allChecked"
             @click="
            () => {
              setAllChecked(shopId)
            }
          "
             class="cart_header_left_checked-iconfont">
          &#xe70f;
        </div>
        <div v-else
             @click="
            () => {
              setAllChecked(shopId)
            }
          "
             class="cart_header_left_unchecked-iconfont">
          &#xe619;
        </div>
        <div class="cart_header_left_text">全选</div>
      </div>
      <div class="cart_header_right">
        <div @click="
            () => {
              clearCart(shopId)
            }
          "
             class="cart_header_right_clear-cart">
          清空购物车
        </div>
      </div>
    </div>
    <div v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
         class="cart_detail">
      <div v-for="item of cartItems"
           :key="item.id"
           class="cart_detail_item">
        <div class="cart_detail_item_left">
          <div @click="
              () => {
                changeItemChecked(shopId, item.id)
              }
            "
               v-if="item.checked"
               class="cart_detail_item_left_checked-iconfont">
            &#xe70f;
          </div>
          <div @click="
              () => {
                changeItemChecked(shopId, item.id)
              }
            "
               v-else
               class="cart_detail_item_left_unchecked-iconfont">
            &#xe619;
          </div>
          <img :src="item.imgUrl"
               alt=""
               class="cart_detail_item_left_image" />
        </div>
        <div class="cart_detail_item_right">
          <div class="cart_detail_item_right_top">{{ item.name }}</div>
          <div class="cart_detail_item_right_bottom">
            <div class="cart_detail_item_right_bottom_price">
              <div class="cart_detail_item_right_bottom_price_promotion">
                ¥{{ item.promotionPrice }}
              </div>
              <div class="cart_detail_item_right_bottom_price_original">
                ¥{{ item.originalPrice }}
              </div>
            </div>
            <div class="cart_detail_item_right_bottom_count">
              <span @click="
                  () => {
                    changeItemToCart(shopId,shopName, item.id, item, -1)
                  }
                "
                    v-show="item.count"
                    class="cart_detail_item_right_bottom_count_minus-iconfont">
                &#xe66d;
              </span>
              <span v-show="item.count"
                    class="cart_detail_item_right_bottom_count_number">
                {{ item.count }}
              </span>
              <span @click="
                  () => {
                    changeItemToCart(shopId,shopName, item.id, item, 1)
                  }
                "
                    class="cart_detail_item_right_bottom_count_plus-iconfont">
                &#xe781;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_count">
      <div class="cart_count_left">
        <div @click="
            () => {
              handleCartShowChange(cartItems)
            }
          "
             class="cart_count_left_icon">
          <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261637089.png"
               alt=""
               class="cart_count_left_icon_image" />
          <span class="cart_count_left_icon_number">{{ total }}</span>
        </div>
        <div class="cart_count_left_count">
          总计:
          <span class="cart_count_left_count_price">¥{{ sumPrice }}</span>
        </div>
      </div>
      <router-link :to="total?{path:`/order-confirmation/${shopId}`}:''">
        <div class="cart_count_right">去结算</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/commonCartEffect'

const userCartEffect = (cartShow) => {
  const store = useStore()
  const route = useRoute()
  // 获取店铺id
  const shopId = route.params.id
  //  獲取購物車数据
  const cartData = store.state.cartData
  //  定义商品数量
  const total = computed(() => {
    // 获取所有商品
    const itemList = cartData[shopId]?.itemList || {}
    // 计算
    let count = 0
    if (itemList) {
      for (const key in itemList) {
        count += itemList[key].count
      }
    }
    return count
  })
  // 计算总价
  const sumPrice = computed(() => {
    // 获取所有商品
    const itemList = cartData[shopId]?.itemList || {}
    // 计算
    let count = 0.0
    if (itemList) {
      for (const key in itemList) {
        if (itemList[key].checked) {
          count += itemList[key].count * itemList[key].promotionPrice
        }
      }
    }
    // 保留小数点2位
    return count.toFixed(2)
  })
  // 购物车数据
  const cartItems = computed(() => {
    const cartItems = cartData[shopId]?.itemList || {}
    // 如果购物车为空，则为false
    if (JSON.stringify(cartItems) !== '{}') {
      cartShow.value = false
    }
    return cartItems
  })
  // 全选框
  const allChecked = computed(() => {
    // 获取所有商品
    const itemList = cartData[shopId]?.itemList || {}
    // 默认选中
    let result = true
    if (itemList) {
      for (const key in itemList) {
        if (!itemList[key].checked) {
          result = false
        }
      }
    }
    return result
  })
  return { cartData, total, sumPrice, cartItems, shopId, allChecked }
}
const userCartShowEffect = () => {
  const cartShow = ref(false)
  const handleCartShowChange = (cartItems) => {
    if (JSON.stringify(cartItems) !== '{}') {
      cartShow.value = !cartShow.value
    }
  }
  return { cartShow, handleCartShowChange }
}
export default {
  name: 'Cart',
  props: ['shopName'],
  setup () {
    const { cartShow, handleCartShowChange } = userCartShowEffect()
    const { changeItemToCart, changeItemChecked, clearCart, setAllChecked } =
      useCommonCartEffect()
    const { cartData, total, sumPrice, cartItems, shopId, allChecked } =
      userCartEffect(cartShow)
    return {
      total,
      sumPrice,
      cartItems,
      changeItemToCart,
      changeItemChecked,
      shopId,
      clearCart,
      allChecked,
      setAllChecked,
      cartShow,
      handleCartShowChange,
      cartData
    }
  }
}
</script>
<style lang="scss" scoped>
// src\views\shop\Cart.vue
@import "../../style/mixins.scss";
.cart {
  position: fixed;
  background-color: #fff;
  width: 375rem;
  left: 0;
  bottom: 0;
  &_header {
    box-sizing: border-box;
    padding: 0 18rem;
    width: 100%;
    height: 52rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rem solid #f1f1f1;
    &_left {
      display: flex;
      align-items: center;
      &_checked-iconfont {
        font-size: 19rem;
        margin-right: 9rem;
        color: #0091ff;
      }
      &_unchecked-iconfont {
        font-size: 19rem;
        margin-right: 9rem;
        color: #0091ff;
      }
      &_text {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333333;
        line-height: 16rem;
      }
    }
  }
  &_detail {
    box-sizing: border-box;
    width: 100%;
    padding: 0 18rem;
    &_item {
      margin: 18rem 0;
      display: flex;
      &_left {
        margin-right: 16rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &_checked-iconfont {
          font-size: 19rem;
          margin-right: 16rem;
          color: #0091ff;
        }
        &_unchecked-iconfont {
          font-size: 19rem;
          margin-right: 16rem;
          color: #0091ff;
        }
        &_image {
          width: 46rem;
          height: 46rem;
          // margin: 0 12rem 12rem 12rem;
        }
      }
      &_right {
        flex-grow: 1;
        margin-left: 12rem;
        &_top {
          @include ellipsis;
          width: 181rem;
          font-family: PingFangSC-Medium;
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8rem;
        }
        &_middle {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #333333;
          line-height: 16rem;
          margin-bottom: 8rem;
        }
        &_bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &_price {
            display: flex;
            align-items: center;
            &_promotion {
              font-family: PingFangSC-Semibold;
              font-size: 14rem;
              color: #e93b3b;
              line-height: 20rem;
              margin-right: 8rem;
              &::first-letter {
                font-size: 12rem;
              }
            }
            &_original {
              font-family: PingFangSC-Regular;
              font-size: 10rem;
              color: #999999;
              line-height: 20rem;
              &::first-letter {
                font-size: 12rem;
              }
            }
          }
          &_count {
            display: flex;
            align-items: center;
            &_minus-iconfont {
              color: #666666;
              font-size: 18rem;
            }
            &_number {
              font-family: PingFangSC-Regular;
              font-size: 14rem;
              color: #333333;
              margin-left: 10rem;
              margin-right: 10rem;
            }
            &_plus-iconfont {
              font-size: 18rem;
              color: #0091ff;
            }
          }
        }
      }
    }
  }
  &_count {
    box-shadow: 0 -1rem 1rem 0 #f1f1f1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49rem;
    // background-color: olivedrab;
    display: flex;
    justify-content: space-between;
    &_left {
      display: flex;
      align-items: center;
      &_icon {
        position: relative;
        margin-left: 24rem;
        margin-right: 32rem;
        &_image {
          width: 28rem;
          height: 26rem;
        }
        &_number {
          display: block;
          min-width: 20rem;
          height: 20rem;
          background: #e93b3b;
          border-radius: 10rem;
          font-family: PingFangSC-Medium;
          font-size: 16rem;
          transform: scale(0.5, 0.5);
          transform-origin: left top;
          color: #ffffff;
          text-align: center;
          position: absolute;
          left: 24rem;
          top: -4rem;
        }
      }
      &_count {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333333;
        &_price {
          font-family: PingFangSC-Medium;
          font-size: 18rem;
          color: #e93b3b;
        }
      }
    }
    &_right {
      width: 98rem;
      height: 49rem;
      background-color: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14rem;
      color: #ffffff;
      text-align: center;
      line-height: 49rem;
    }
  }
}
.mask {
  position: fixed;
  background-color: rgba($color: #000000, $alpha: 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 49rem;
}
</style>
