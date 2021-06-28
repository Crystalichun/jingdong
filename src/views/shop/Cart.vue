<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
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
export default {
  name: 'Cart'
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
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
</style>
