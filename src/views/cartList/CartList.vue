<template>
  <div class="wrapper">
    <Title :title-content="`我的全部购物车（${cartProductsNum}）`"/>
    <div class="cart">
<!--      <template-->
<!--        v-for="{shop, index} in cartList"-->
<!--        :key="index"-->
<!--      >-->
<!--        <div class="shop">-->
<!--          <div class="shop__name">{{shop.shopName}}</div>-->
<!--          <template-->
<!--            v-for="{product, productIndex} in shop?.productList"-->
<!--            :key="productIndex"-->
<!--          >-->
<!--            <div class="">-->

<!--            </div>-->
<!--          </template>-->
<!--        </div>-->
<!--      </template>-->
    </div>
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import Docker from '../../components/Docker'
import Title from '../../components/Title'
import { useCommonCartEffect } from '@/effects/commonCartEffect'
export default {
  name: 'CartList',
  components: { Docker, Title },
  setup () {
    const { cartList } = useCommonCartEffect()
    console.log(cartList)
    const cartProductsNum = 2
    return { cartProductsNum, cartList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables";
@import "../../style/mixins";
.wrapper {
  @include wrapper
}
</style>
