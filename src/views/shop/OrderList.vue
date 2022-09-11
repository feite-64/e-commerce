<template>
  <div class="header">我的订单</div>
  <div class="container">
    <div v-for="item of orderList"
         :key="item.shopId"
         class="container_order">
      <div class="container_order_top">
        <div class="container_order_top_title">{{ item.shopName }}</div>
        <div class="container_order_top_status">已取消</div>
      </div>
      <div class="container_order_bottom">
        <div class="container_order_bottom_products">
          <img v-for="productItem of item.itemList"
               :key="productItem.id"
               :src="productItem.imgUrl"
               class="container_order_bottom_products_image"
               alt="" />
        </div>
        <div class="container_order_bottom_count">
          <div class="container_order_bottom_count_total-price">
            ¥{{ computeTotalPrice(item.itemList) }}
          </div>
          <div class="container_order_bottom_count_total-number">
            共{{ computeTotalNumber(item.itemList) }}件
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker tag="order" />
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'
const userOrderListEffect = () => {
  const orderList = ref([])
  const getOrderList = async () => {
    const result = await get('/api/order-list/1')
    if (result.data.code === '0000') {
      orderList.value = result.data.data
    } else {
      orderList.value = []
    }
  }
  const computeTotalPrice = (list) => {
    let totalPrice = 0.0
    list.forEach((element) => {
      totalPrice += element.count * element.promotionPrice
    })
    return totalPrice.toFixed(2)
  }
  const computeTotalNumber = (list) => {
    let totalNumber = 0
    list.forEach((element) => {
      totalNumber += element.count
    })
    return totalNumber
  }
  getOrderList()
  return { orderList, computeTotalPrice, computeTotalNumber }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { orderList, computeTotalPrice, computeTotalNumber } =
      userOrderListEffect()
    console.log(orderList)
    return { orderList, computeTotalPrice, computeTotalNumber }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 375rem;
  height: 44rem;
  background-color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 16rem;
  color: #333333;
  text-align: center;
  line-height: 44rem;
}
.container {
  position: fixed;
  top: 44rem;
  right: 0;
  left: 0;
  bottom: 49rem;
  background-color: #f8f8f8;
  &_order {
    width: 339rem;
    height: 110rem;
    margin: 16rem auto;
    overflow: hidden;
    background: #ffffff;
    border-radius: 4rem;
    padding: 16rem;
    box-sizing: border-box;
    &_top {
      display: flex;
      justify-content: space-between;
      height: 22rem;
      margin-bottom: 16rem;
      align-items: center;
      &_title {
        font-family: PingFangSC-Medium;
        font-size: 16rem;
        color: #333333;
      }
      &_status {
        font-family: PingFangSC-Medium;
        font-size: 14rem;
        color: #999999;
      }
    }
    &_bottom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      &_products {
        &_image {
          width: 40rem;
          height: 40rem;
          margin-right: 12rem;
        }
      }
      &_count {
        &_total-price {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #e93b3b;
          text-align: right;
          margin-bottom: 4rem;
          line-height: 20rem;
        }
        &_total-number {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #333333;
          line-height: 14rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
