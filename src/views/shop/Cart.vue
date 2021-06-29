<template>
  <div
    class="mask"
    v-if="showCart"
    @click="handleCartShowChange"
  />
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span
            class="product__header__icon iconfont"
            v-html="allChecked ? '&#xe652;': '&#xe667;'"
          />全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn" @click="() => cleanCartProducts(shopId)">
            清空购物车
          </span>
        </div>
      </div>
      <template v-for="item in productList"
                :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe652;': '&#xe667;'"
            @click="() => changeCartItemChecked(shopId, item._id)"
          />
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click.stop="() => changeCartItemInfo(shopId, item, -1)"
            >-</span>
            {{item.count || 0}}
            <span
              class="product__number__plus"
              @click.stop="() => changeCartItemInfo(shopId, item, 1)"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{totalPrice}}</span>
      </div>
      <div class="check__btn">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect.js'
import { useStore } from 'vuex'

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

const useCartEffect = (shopId) => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const productList = computed(() => {
    return cartList?.[shopId] || []
  })
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        count += product.count
      }
    }
    return count
  })
  const totalPrice = computed(() => {
    const productList = cartList[shopId]
    let price = 0
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        if (product.check) {
          price += (product.count * product.price)
        }
      }
    }
    return price.toFixed(2)
  })
  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  return {
    productList,
    allChecked,
    total,
    totalPrice,
    changeCartItemInfo,
    changeCartItemChecked,
    setCartItemsChecked,
    cleanCartProducts
  }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const {
      productList, allChecked, total, totalPrice,
      changeCartItemInfo, changeCartItemChecked, setCartItemsChecked, cleanCartProducts
    } = useCartEffect(shopId)
    return {
      shopId,
      showCart,
      productList,
      allChecked,
      total,
      totalPrice,
      handleCartShowChange,
      changeCartItemInfo,
      changeCartItemChecked,
      setCartItemsChecked,
      cleanCartProducts
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index:1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}
.check {
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .12rem .32rem .12rem .24rem;
      width: .28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: #E93B3B;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #FFF;
      left: 0.46rem;
      top: 0.04rem;
      padding: .02rem;
      //从左、中开始放大缩小，距离左边位置不变
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price {
      line-height: .49rem;
      font-size: .18rem;
      color: $highlight-fontColor;
    }
  }
  &__btn {
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
    font-size: .14rem;
  }
}
.product{
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &__header {
    display: flex;
    line-height: .52rem;
    height: .52rem;
    border-bottom: 1px solid $content-bgColor;
    font-size: .14rem;
    color: $content-fontcolor;
    &__all {
      width: .64rem;
      margin-left: .16rem;
    }
    &__icon {
      display: inline-block;
      color: #0091FF;
      font-size: 0.2rem;
      margin-right: .1rem;
      vertical-align: top;
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: .16rem;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__checked {
      line-height: .46rem;
      margin-right: .2rem;
      color: $btn-bgColor;
      font-size: .2rem;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
      //font-size显示为10px的方法
      //font-size: .2rem;
      //transform: scale(.5, .5);
      //transform-origin: center top;

    }
  }
  &__number {
    position: absolute;
    right: 0;
    bottom: .26rem;
    &__minus, &__plus {
      display: inline-block;
      line-height: .16rem;
      border-radius: 50%;
      font-size: .2rem;
      text-align: center;
    }
    &__minus {
      width: 0.19rem;
      height: 0.19rem;
      border: .01rem solid $medium-fontColor;
      color: $medium-fontColor;
      margin-right: .05rem;
    }
    &__plus {
      width: .2rem;
      height: .2rem;
      background: $btn-bgColor;
      color: $bgColor;
      margin-left: .05rem;
    }
  }
}
</style>
