<template>
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
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
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
     color: $bgColor;
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
     background: $bgColor;
     border-radius: .04rem;
     max-height: 1.11rem;
     color: $content-fontcolor;
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
     color: $medium-fontColor;
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
     color: $content-fontcolor;
     font-size: .2rem;
   }
  }
}
</style>
