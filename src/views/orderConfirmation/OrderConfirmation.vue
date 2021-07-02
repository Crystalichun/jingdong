<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back"
             @click="handleBackClick"
        >&#xe6f2;
        </div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">18911024266</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe6f2;</div>
      </div>
    </div>
    <div class="products">
      <div class="products__title">
        {{ shopName }}
      </div>
      <div class="products__wrapper">
        <div class="products__list">
          <template
            v-for="item in productList"
            :key="item._id"
          >
            <div v-if="item.count > 0" class="products__item">
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
          </template>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price">实付金额 <b>¥{{calculations.totalPrice}}</b></div>
      <div class="order__btn">提交订单</div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/commonCartEffect'

export default {
  name: 'OrderConfirmation',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList, calculations } = useCommonCartEffect(shopId)
    const handleBackClick = () => {
      router.back()
    }
    return { shopName, productList, calculations, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  overflow-y: scroll;
}

.top {
  position: relative;
  height: 1.96rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: #FFF;
    text-align: center;
    font-size: .16rem;
    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }
  &__receiver {
    position: relative;
    margin: .22rem .18rem .16rem .18rem;
    background: #FFFFFF;
    border-radius: .04rem;
    max-height: 1.11rem;
    color: #333;
    padding: .16rem;
    &__title {
      line-height: .22rem;
      font-size: .16rem;
    }
    &__address {
      padding: .14rem 0 .06rem;
      line-height: .2rem;
      font-size: .14rem;
    }
    &__info {
      font-size: .12rem;
      color: #666;
      line-height: .18rem;
      &__name {
        margin-right: .06rem;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: #666;
      font-size: .2rem;
    }
  }
}

.products{
  margin: 0 .18rem;
  background: #FFF;
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
    background: #FFF;
    padding: 0 .16rem;
  }
  &__title {
    font-size: .16rem;
    color: #333;
    line-height: .22rem;
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
      color: #000
    }
  }
}

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #FFF;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
</style>
