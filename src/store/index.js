// src\store\index.js
import { createStore } from 'vuex'
// 把购物车放入缓存
const setLocalCartData = (state) => {
  // 把购物相关数据解构出来/获取购物车数据
  const { cartData } = state
  // 对象转json字符串
  const cartDataString = JSON.stringify(cartData)
  // 保存到localStorage
  localStorage.cartData = cartDataString
}

// 从缓存中获取购物车数据
const getLocalCartData = () => {
  let result = {}
  // 判断localStorage里面是否有数据
  if (localStorage.cartData) {
    result = JSON.parse(localStorage.cartData)
  }
  // 返回数据
  return result
}
export default createStore({
  state: {
    cartData: getLocalCartData()
  },
  mutations: {
    // 增减商品(inputValue)数量
    changeItemToCart (state, payload) {
      // 解构赋值获取商品数据
      const { shopId, shopName, itemId, itemInfo, num } = payload
      let shopInfo = {}
      // 判断是否包含shopid
      if (state.cartData[shopId]) {
        shopInfo = state.cartData[shopId]
      } else {
        shopInfo.shopName = shopName
        shopInfo.itemList = {}
      }

      // 判断是否包含itemid
      let item = null
      if (shopInfo.itemList[itemId]) {
        item = shopInfo.itemList[itemId]
      } else {
        item = itemInfo
        item.count = 0
      }
      // 添加/减少
      item.count += num
      // 添加数据到上一级
      shopInfo[itemId] = item
      state.cartData[shopId] = shopInfo
      // 如果商品数量为空，从购物车删除
      if (item.count === 0) {
        delete shopInfo.itemList[itemId]
      } else {
        // 选中状态
        item.checked = true
        // 添加商品
        shopInfo.itemList[itemId] = item
      }
      // 判断购物车是否为空
      if (JSON.stringify(shopInfo.itemList) !== '{}') {
        state.cartData[shopId] = shopInfo
      } else {
        delete state.cartData[shopId]
      }
      setLocalCartData(state)
    },
    // 单选框的选中状态
    changeItemChecked (state, payload) {
      const { shopId, itemId } = payload
      const item = state.cartData[shopId].itemList[itemId]
      item.checked = !item.checked
      setLocalCartData(state)
    },
    // 清除购物车
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartData[shopId].itemList = {}
      setLocalCartData(state)
    },
    // 全选按钮
    setAllChecked (state, payload) {
      const { shopId } = payload
      const shopInfo = state.cartData[shopId].itemList
      for (const key in shopInfo) {
        shopInfo[key].checked = !shopInfo[key].checked
      }
      setLocalCartData(state)
    }
  },
  actions: {},
  getters: {},
  modules: {}
})
