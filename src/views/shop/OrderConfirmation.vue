<template>
  <div class="container">
    <div class="container_top">
      <div class="container_top_header">
        <div @click="handleBackClick"
             class="container_top_header_back">
          &#xe600;
        </div>
        <div class="container_top_header_text">确认订单</div>
      </div>
      <div class="container_top_receiver">
        <div class="container_top_receiver_left">
          <div class="container_top_receiver_left_title">收货地址</div>
          <div class="container_top_receiver_left_address">
            北京理工大学国防科技园2号楼10层
          </div>
          <div class="container_top_receiver_left_info">
            <div class="container_top_receiver_left_info_name">
              瑶妹（先生）
            </div>
            <div class="container_top_receiver_left_info_phone">
              18911024266
            </div>
          </div>
        </div>
        <div class="container_top_receiver_right">
          <div class="container_top_receiver_right_icon">&#xe6a3;</div>
        </div>
      </div>
    </div>
    <div class="container_order">
      <div class="container_order_shop-name">沃尔玛</div>
      <div class="container_order_info">
        <div v-for="item of Object.keys(cartItems).slice(0, 2)"
             :key="cartItems[item].id"
             class="container_order_info_item">
          <div class="container_order_info_item_left">
            <img :src="cartItems[item].imgUrl"
                 alt=""
                 class="container_order_info_item_left_image" />
          </div>
          <div class="container_order_info_item_right">
            <div class="container_order_info_item_right_name">
              {{ cartItems[item].name }}
            </div>
            <div class="container_order_info_item_right_price">
              <div class="container_order_info_item_right_price_left">
                ¥{{ cartItems[item].promotionPrice }} x
                {{ cartItems[item].count }}
              </div>
              <div class="container_order_info_item_right_price_right">
                ¥{{
                  (
                    cartItems[item].promotionPrice * cartItems[item].count
                  ).toFixed(2)
                }}
              </div>
            </div>
          </div>
        </div>
        <template v-if="!showMore">
          <div v-for="item of Object.keys(cartItems).slice(2)"
               :key="cartItems[item].id"
               class="container_order_info_item">
            <div class="container_order_info_item_left">
              <img :src="cartItems[item].imgUrl"
                   alt=""
                   class="container_order_info_item_left_image" />
            </div>
            <div class="container_order_info_item_right">
              <div class="container_order_info_item_right_name">
                {{ cartItems[item].name }}
              </div>
              <div class="container_order_info_item_right_price">
                <div class="container_order_info_item_right_price_left">
                  ¥{{ cartItems[item].promotionPrice }} x
                  {{ cartItems[item].count }}
                </div>
                <div class="container_order_info_item_right_price_right">
                  ¥{{
                    (
                      cartItems[item].promotionPrice * cartItems[item].count
                    ).toFixed(2)
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <div @click="showMoreClick"
             v-if="showMore && Object.keys(cartItems).length >= 2"
             class="container_order_info_more">
          共计商品{{ Object.keys(cartItems).length }}种/{{ sumNumber }}件 &nbsp;
          &nbsp;&#xe638;
        </div>
      </div>
    </div>
    <div class="container_bottom">
      <div class="container_bottom_left">
        实付金额
        <span class="container_bottom_left_total-price">¥{{ sumPrice }}</span>
      </div>
      <div @click="submitOrderClick"
           class="container_bottom_right">
        提交订单
      </div>
    </div>
    <div class="container_mask"
         v-if="maskShow">
      <div class="container_mask_black-panel"
           @click="blackPanelClick"></div>
      <div class="container_mask_white-panel"
           v-if="whitePanelShow">
        <div class="container_mask_white-panel_title">确认要离开收银台？</div>
        <div class="container_mask_white-panel_content">
          请尽快完成支付，否则将被取消
        </div>
        <div class="container_mask_white-panel_buttons">
          <div @click="cancelOrderClick"
               class="container_mask_white-panel_buttons_cancel">
            取消订单
          </div>
          <div class="container_mask_white-panel_buttons_confirm"
               @click="confirmPayClick">
            确认支付
          </div>
        </div>
      </div>
      <div class="container_mask_notice-panel"
           v-if="noticePanelShow">
        <div class="container_mask_notice-panel_cancel-iconfont"
             @click="cancelIconClick">
          &#xe633;
        </div>
        <div class="container_mask_notice-panel_right-iconfont">&#xe6f5;</div>
        <div class="container_mask_notice-panel_notice">支付成功，等待配送</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useBackRouterEffect } from '../../effects/backEffect'
const useOrderEffect = () => {
  const route = useRoute()
  const store = useStore()
  // 商铺id
  const shopId = route.params.shopId
  // 购物车数据
  const cartData = store.state.cartData
  // 商铺名称
  const shopName = cartData[shopId].shopName
  // 购物车商品列表
  const cartItems = cartData[shopId].itemList
  // 计算总价
  let sumPrice = 0.0
  let sumToFixed = 0.0
  // 计算总数
  let sumNumber = 0
  for (const key in cartItems) {
    sumToFixed += cartItems[key].count * cartItems[key].promotionPrice
    sumNumber += cartItems[key].count
  }
  sumPrice = sumToFixed.toFixed(2)
  return { shopName, cartItems, sumPrice, sumNumber }
}
const useShowMoreEffect = () => {
  const showMore = ref(true)
  const showMoreClick = () => {
    showMore.value = false
  }
  return { showMore, showMoreClick }
}
const useShowMaskEffect = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const shopId = route.params.shopId
  // 蒙层显示, 默认false, 不显示
  const maskShow = ref(false)
  // 白色面板
  const whitePanelShow = ref(false)
  // 通知面板
  const noticePanelShow = ref(false)
  // 黑色蒙层点击逻辑
  const blackPanelClick = () => {
    // 整个蒙层隐藏
    maskShow.value = false
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = false
    // 如果通知面板展示的话, 应该跳转到订单页
  }
  // 订单返回点击效果
  const cancelOrderClick = () => {
    // 点击返回, 隐藏蒙层
    maskShow.value = false
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = false
  }
  // 提交订单逻辑
  const submitOrderClick = () => {
    // 点击提交订单, 展示蒙层
    maskShow.value = true
    // 白面板关闭
    whitePanelShow.value = true
    // 通知面板关闭
    noticePanelShow.value = false
  }
  // 消息模板的叉号点击逻辑
  const cancelIconClick = () => {
    // 所有面板隐藏
    // 点击提交订单, 展示蒙层
    maskShow.value = false
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = false
    // 跳转到订单页
  }
  // 点击确认支付
  const confirmPayClick = () => {
    // 点击确认支付
    maskShow.value = true
    // 白面板关闭
    whitePanelShow.value = false
    // 通知面板关闭
    noticePanelShow.value = true
    // 清空购物车
    store.commit('clearCart', { shopId })

    // 跳转到订单列表
    router.push('/order-list')
  }
  return {
    maskShow,
    whitePanelShow,
    noticePanelShow,
    blackPanelClick,
    submitOrderClick,
    cancelOrderClick,
    cancelIconClick,
    confirmPayClick
  }
}
export default {
  name: 'OrderConfirmation',
  setup () {
    const { shopName, cartItems, sumPrice, sumNumber } = useOrderEffect()
    const handleBackClick = useBackRouterEffect()
    const { showMore, showMoreClick } = useShowMoreEffect()
    const {
      maskShow,
      whitePanelShow,
      noticePanelShow,
      blackPanelClick,
      submitOrderClick,
      cancelOrderClick,
      cancelIconClick,
      confirmPayClick
    } = useShowMaskEffect()
    return {
      shopName,
      cartItems,
      handleBackClick,
      sumNumber,
      sumPrice,
      showMore,
      showMoreClick,
      maskShow,
      whitePanelShow,
      noticePanelShow,
      blackPanelClick,
      submitOrderClick,
      cancelOrderClick,
      cancelIconClick,
      confirmPayClick
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  background-color: #f8f8f8;
  &_top {
    &_header {
      width: 375rem;
      height: 159rem;
      background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
      );
      &_back {
        font-size: 24rem;
        color: #fff;
        position: absolute;
        left: 18.5rem;
        top: 18rem;
      }
      &_text {
        text-align: center;
        padding-top: 21rem;
        font-family: PingFangSC-Regular;
        font-size: 16rem;
        color: #ffffff;
      }
    }
    &_receiver {
      width: 339rem;
      height: 111rem;
      background-color: #fff;
      border-radius: 4rem;
      margin: 0 auto;
      position: relative;
      top: -74rem;
      padding: 16rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      &_left {
        &_title {
          font-family: PingFangSC-Medium;
          font-size: 16rem;
          color: #333333;
          margin-bottom: 16rem;
        }
        &_address {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8rem;
        }
        &_info {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #666666;
          display: flex;
          &_name {
            margin-right: 6rem;
          }
        }
      }
      &_right {
        display: flex;
        align-items: center;
        font-size: 17rem;
        color: #666;
      }
    }
  }
  &_order {
    border-radius: 4rem;
    max-height: 400rem;
    overflow-y: auto;
    width: 339rem;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    top: -58rem;
    padding: 16rem;
    padding-bottom: 6rem;
    box-sizing: border-box;
    &_shop-name {
      font-family: PingFangSC-Medium;
      font-size: 16rem;
      color: #333333;
      margin-bottom: 16rem;
    }
    &_info {
      &_item {
        display: flex;
        margin-bottom: 6rem;
        &_left {
          &_image {
            width: 46rem;
            height: 46rem;
            margin-right: 16rem;
          }
        }
        &_right {
          flex-grow: 1;
          &_name {
            margin-top: 2rem;
            font-family: PingFangSC-Medium;
            font-size: 14rem;
            color: #333333;
            margin-bottom: 8rem;
          }
          &_price {
            display: flex;
            justify-content: space-between;
            &_left {
              font-family: PingFangSC-Regular;
              font-size: 28rem;
              color: #e93b3b;
              transform: scale(0.5, 0.5);
              transform-origin: left top;
              // 指定首字母样式
              &::first-letter {
                font-size: 20rem;
              }
            }
            &_right {
              font-family: PingFangSC-Regular;
              font-size: 28rem;
              color: #000000;
              text-align: right;
              transform: scale(0.5, 0.5);
              transform-origin: right top;
              &::first-letter {
                font-size: 20rem;
              }
            }
          }
        }
      }
      &_more {
        width: 307rem;
        height: 28rem;
        background: #f5f5f5;
        margin: 0 auto;
        font-size: 14rem;
        color: #999999;
        line-height: 28rem;
        text-align: center;
        margin-bottom: 12rem;
      }
    }
  }
  &_bottom {
    display: flex;
    width: 375rem;
    height: 49rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    &_left {
      padding-left: 24rem;
      box-sizing: border-box;
      width: 277rem;
      background-color: #fff;
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: #333333;
      line-height: 49rem;
      &_total-price {
        font-family: PingFangSC-Medium;
        font-size: 16rem;
        color: #333333;
        text-align: right;
        line-height: 49rem;
      }
    }
    &_right {
      width: 98rem;
      background: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14rem;
      color: #ffffff;
      text-align: center;
      line-height: 49rem;
    }
  }
  &_mask {
    &_black-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    &_white-panel {
      box-sizing: border-box;
      padding-top: 24rem;
      width: 301rem;
      height: 157rem;
      background: #ffffff;
      border-radius: 4rem;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      &_title {
        font-family: PingFangSC-Medium;
        font-size: 18rem;
        color: #333333;
        text-align: center;
        margin-bottom: 12rem;
      }
      &_content {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        text-align: center;
        color: #666666;
        margin-bottom: 26rem;
      }
      &_buttons {
        width: 184rem;
        height: 32rem;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        &_cancel {
          width: 80rem;
          height: 32rem;
          border: 1rem solid #4fb0f9;
          border-radius: 16rem;
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #0091ff;
          line-height: 32rem;
          text-align: center;
        }
        &_confirm {
          width: 80rem;
          height: 32rem;
          background: #4fb0f9;
          border: 1rem solid #4fb0f9;
          border-radius: 16rem;
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #ffffff;
          line-height: 32rem;
          text-align: center;
        }
      }
    }
    &_notice-panel {
      width: 301rem;
      height: 156rem;
      background: #ffffff;
      border-radius: 4rem;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &_cancel-iconfont {
        font-size: 18rem;
        color: #666666;
        position: absolute;
        top: 12rem;
        right: 12rem;
      }
      &_right-iconfont {
        font-size: 56rem;
        color: #000;
        text-align: center;
        margin-top: 42rem;
        font-weight: bold;
      }
      &_notice {
        font-family: PingFangSC-Medium;
        font-size: 18rem;
        color: #333333;
        text-align: center;
        margin-top: 6rem;
      }
    }
  }
}
</style>
