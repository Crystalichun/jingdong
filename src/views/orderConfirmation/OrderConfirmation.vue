<template>
  <div class="wrapper">
    <TopArea/>
    <ProductList :shopId="shopId" :showWrapper="true"/>
    <Order/>
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from '../../components/ProductList'
import Order from './Order'
import { useRoute } from 'vue-router'

export default {
  name: 'OrderConfirmation',
  components: { ProductList, TopArea, Order },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    return { shopId }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins";
.wrapper {
  @include wrapper;
  bottom: 0;
  background: #eee;
  overflow-y: scroll;
}
</style>
