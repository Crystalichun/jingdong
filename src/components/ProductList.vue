<template>
  <div class="products">
    <div :class="{'products__title' : true, 'products__title__margin' : titleMargin}">
      {{ shopName }}
    </div>
    <div :class="{'products__wrapper' : showWrapper}">
      <div :class="{'products__list': true , 'products__list__padding': noPadding}">
        <div
          v-for="item in productList"
          :key="item._id"
          class="products__item"
        >
          <img class="products__item__img" :src="item.imgUrl"/>
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <p class="products__item__price">
              <span>
                <span class="products__item__yen">&yen; </span>
                {{ item.price }} x {{ item.count }}
              </span>
              <span class="products__item__total">
                <span class="products__item__yen">&yen; </span>
                {{ (item.price * item.count).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '@/effects/commonCartEffect'

export default {
  name: 'ProductList',
  props: ['shopId', 'showWrapper', 'noPadding', 'titleMargin'],
  setup (props) {
    const { shopName, productList } = useCommonCartEffect(props.shopId)
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables';
@import '../style/mixins';
.products{
  margin: 0 .18rem;
  background: $bgColor;
  padding: .16rem;
  &__wrapper {
    overflow-y: scroll;
    margin: 0 0.18rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.6rem;
    top: 2.49rem;
  }
  &__list {
    background: $bgColor;
    padding: 0 .16rem;
    &__padding {
      padding: 0;
    }
  }
  &__title {
    font-size: .16rem;
    color: $content-fontcolor;
    line-height: .22rem;
    &__margin {
      margin-bottom: .16rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding-bottom: .16rem;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      overflow: hidden;
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontColor
    }
  }
}
</style>
