<template>
  <div class="cart">
    <div class="product">
      <div
        class="product__item"
        v-for="item in productList"
        :key="item._id"
      >
        <div
          class="product__item__checked iconfont"
        >&#xe652;</div>
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
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">2</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; 128</span>
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

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

const useCartEffect = (shopId) => {
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const productList = computed(() => {
    return cartList?.[shopId] || []
  })
  return { productList, changeCartItemInfo }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { productList, changeCartItemInfo } = useCartEffect(shopId)
    return { shopId, showCart, handleCartShowChange, productList, changeCartItemInfo }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
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
