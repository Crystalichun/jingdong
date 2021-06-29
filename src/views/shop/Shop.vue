<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">
        &#xe6f2;
      </div>
      <div class="search__content">
        <span class="search__content__icon iconfont ">&#xe62d;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <ShopContent :shopName="item.name"/>
    <Cart/>
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo'
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request'
import { useRouter, useRoute } from 'vue-router'
import ShopContent from '@/views/shop/ShopContent'
import Cart from '@/views/shop/Cart'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const { item } = toRefs(data)
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  return { item, getItemData }
}

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'Shop',
  components: { ShopContent, ShopInfo, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 .18rem;
}

.search {
  display: flex;
  margin: .16rem 0 .04rem 0;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex:1;
    background: $search-bgColor;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      height: .32rem;
      width: 100%;
      padding-right: .2rem;
      outline: none;
      border: none;
      background: none;
      font-size: .14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
