<template>
  <div class="wrapper">
    <Title :title-content="`我的全部购物车（${cartProductsNum}）`"/>
    <div class="cart">
      <template
        v-for="(shop, shopId, index) in cartList"
        :key="index"
      >
        <div class="cart__shop">
          <ProductList :shopId="shopId"/>
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
export default {
  name: 'CartList',
  components: { Docker, Title, ProductList },
  setup () {
    const { cartList } = useCommonCartEffect()
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
.cart {
  margin-top: .16rem;
  &__shop {
    margin-bottom: .16rem;
  }
}
</style>
