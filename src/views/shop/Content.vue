<template>
  <div class="content">
    <div class="content_left">
      <div @click="() => handLeftItemChange(item.name)"
           v-for="item of leftItems"
           :key="item.name"
           :class="{
          content_left_item: true,
          'content_left_item-active': item.name === currentItemName
        }">
        {{ item.text }}
      </div>
    </div>
    <div class="content_right">
      <div v-for="item of rightItems"
           :key="item.id"
           class="content_right_item">
        <div class="content_right_item_left">
          <img :src="item.imgUrl"
               alt=""
               class="content_right_item_left_image" />
        </div>
        <div class="content_right_item_right">
          <div class="content_right_item_right_top">{{ item.name }}</div>
          <div class="content_right_item_right_middle">
            月售{{ item.sales }}件
          </div>
          <div class="content_right_item_right_bottom">
            <div class="content_right_item_right_bottom_price">
              <div class="content_right_item_right_bottom_price_promotion">
                ¥{{ item.promotionPrice }}
              </div>
              <div class="content_right_item_right_bottom_price_original">
                ¥{{ item.originalPrice }}
              </div>
            </div>
            <div class="content_right_item_right_bottom_count">
              <span @click="() => changeItemToCart(shopId,shopName, item.id,item, -1)"
                    v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                    class="content_right_item_right_bottom_count_minus-iconfont">
                &#xe66d;
              </span>
              <span v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                    class="content_right_item_right_bottom_count_number">
                {{ cartData?.[shopId]?.itemList?.[item.id]?.['count'] }}
              </span>
              <span @click="
                  () => {
                    changeItemToCart(shopId,shopName, item.id, item, 1)
                  }
                "
                    class="content_right_item_right_bottom_count_plus-iconfont">
                &#xe781;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/commonCartEffect'

const userTabEffect = () => {
  const currentItemName = ref('all')
  const handLeftItemChange = (itemName) => {
    currentItemName.value = itemName
  }
  return { handLeftItemChange, currentItemName }
}
const userContentEffect = (currentItemName) => {
  const route = useRoute()
  const shopId = route.params.id
  const rightItems = ref([])
  const getContentData = async (shopId, currentTab) => {
    const result = await get(`/api/shop/${shopId}/${currentTab}`)
    console.log(1)
    rightItems.value = result.data.data
  }
  watchEffect(() => {
    getContentData(shopId, currentItemName.value)
  })
  return { rightItems, shopId }
}
export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const leftItems = [
      { name: 'all', text: '全部商品' },
      { name: 'seckill', text: '秒杀' },
      { name: 'fruit', text: '新鲜水果' },
      { name: 'snacks', text: '休闲食品' },
      { name: 'vegetable', text: '时令蔬菜' },
      { name: 'meat', text: '肉蛋家禽' }
    ]
    const { handLeftItemChange, currentItemName } = userTabEffect()
    const { cartData, changeItemToCart } = useCommonCartEffect()
    const { rightItems, shopId } = userContentEffect(currentItemName)

    return {
      shopId,
      changeItemToCart,
      leftItems,
      rightItems,
      currentItemName,
      handLeftItemChange,
      cartData
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/mixins.scss";
.content {
  position: absolute;
  top: 146rem;
  bottom: 49rem;
  left: 0;
  right: 0;
  display: flex;
  &_left {
    background-color: #f5f5f5;
    &_item {
      width: 76rem;
      height: 40rem;
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      color: #333333;
      text-align: center;
      line-height: 40rem;
      &-active {
        background-color: #fff;
      }
    }
  }
  &_right {
    flex-grow: 1;
    background-color: #fff;
    &_item {
      margin: 0 18rem 12rem 16rem;
      border-bottom: 1rem solid #f1f1f1;
      display: flex;
      &_left {
        margin-right: 16rem;
        &_image {
          width: 68rem;
          height: 68rem;
          margin-bottom: 12rem;
        }
      }
      &_right {
        flex-grow: 1;
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
}
</style>
