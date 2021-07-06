<template>
  <div class="wrapper">
    <Title :title-content="`我的全部购物车（${cartProductsNum}）`"/>
    <div class="cart">
      <template
        v-for="(shop, shopId, index) in cartList"
        :key="index"
      >
        <div class="cart__shop" v-if="Object.keys(shop?.productList).length !== 0">
          <ProductList :shopId="shopId" :noPadding="true" :titleMargin="true"/>
        </div>
      </template>
    </div>
  </div>
  <Docker :currentIndex="1"/>
</template>Id

<script>
import Docker from '../../components/Docker'
import Title from '../../components/Title'
import ProductList from '../../components/ProductList'
import { useCommonCartEffect } from '@/effects/commonCartEffect'
import { ref } from 'vue'

const useCartProductsEffect = (cartList) => {
  const cartProductsNum = ref(0)
  if (Object.keys(cartList).length !== 0) {
    for (const shopId in cartList) {
      const productList = cartList[shopId]?.productList || {}
      if (Object.keys(productList).length !== 0) {
        for (const i in productList) {
          const product = productList[i]
          if (product.count > 0) {
            cartProductsNum.value += product.count
          }
        }
      }
    }
  }
  return { cartProductsNum }
}
export default {
  name: 'CartList',
  components: { Docker, Title, ProductList },
  setup () {
    const { cartList } = useCommonCartEffect()
    const { cartProductsNum } = useCartProductsEffect(cartList)
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
.cart {
  margin-top: .16rem;
  &__shop {
    margin-bottom: .16rem;
  }
}
.products {
  padding: .16rem .16rem 0;
}
</style>
