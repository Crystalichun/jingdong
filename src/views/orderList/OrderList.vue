<template>
  <div class="wrapper">
    <Title :title-content="'我的订单'"/>
    <div class="orders">
      <div class="order"
           v-for="(item, index) in list"
           :key="index"
      >
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">
            {{item.isCanceled ? '已取消' : '已完成'}}
          </span>
        </div>
        <div class="order__content">
            <div class="order__content__imgs">
              <template
                v-for="(innerItem, innerIndex) in item.products"
                :key="innerIndex"
              >
              <img class="order__content__img"
                   :src="innerItem.product.img"
                   v-if="innerIndex <= 3"
              />
              </template>
            </div>
          <div class="order__content__info">
            <div class="order__content__price">¥ {{item.totalPrice}}</div>
            <div class="order__content__count">共 {{item.totalNumber}} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import Docker from '../../components/Docker'
import Title from '../../components/Title'
import { get } from '@/utils/request'
import { reactive, toRefs } from 'vue'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      result.data.forEach((order) => {
        const products = order.products || []
        let totalNumber = 0
        let totalPrice = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalNumber = totalNumber
        order.totalPrice = totalPrice
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker, Title },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables";
@import "../../style/mixins";
.wrapper {
  @include wrapper
}
.orders {
  padding: .16rem .18rem 0 .18rem;
}
.order {
  background: $bgColor;
  height: 1.11rem;
  padding: .16rem;
  box-sizing: border-box;
  &__title {
    font-size: .16rem;
    color: $content-fontcolor;
    line-height: .22rem;
    margin-bottom: .16rem;
  }
  &__status {
    font-size: .14rem;
    color: $light-fontColor;
    float: right;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      width: .7rem;
    }
    &__price {
      font-size: .14rem;
      color: $highlight-fontColor;
      text-align: right;
      line-height: .2rem;
      margin-bottom: .04rem;
    }
    &__count {
      font-size: .12rem;
      color: $content-fontcolor;
      text-align: right;
      line-height: .14rem;
    }
  }
}
</style>
