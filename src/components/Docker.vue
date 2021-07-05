<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe7e5;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe61e;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriables";

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  padding: 0 .18rem;
  border-top: .01rem solid $content-bgColor;
  color: $content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
    .iconfont {
      font-size: .18rem;
      margin: .07rem 0 .02rem 0;
    }
    &--active {
      a {
        color: #1FA4FC;
      }
    }
  }

  &__title {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: center top;
  }
}

</style>
