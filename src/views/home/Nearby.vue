<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__item"
         v-for="item in nearbyList"
         :key="item.id">
      <img class="nearby__item__img" :src="item.imgUrl">
      <div class="nearby__content">
        <div class="nearby__content__title">{{item.title}}</div>
        <div class="nearby__content__tags">
          <span class="nearby__content__tag"
                v-for="(tag , index) in item.tags"
                :key="index"
          >
          {{tag}}
        </span>
        </div>
        <p class="nearby__content__highlight">{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const nearbyList = [{
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥0', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }, {
      id: 2,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥5', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }, {
      id: 3,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥5', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }]
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables";

.nearby {
  &__title {
    font-size: 18px;
  }
  &__item {
    display: flex;
    &__img {
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
    }
  }
  &__content{
    padding-bottom: .12rem;
    border-bottom: 1px solid $content-bgColor;
    &__title{
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__tags{
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__highlight {
      margin: .08rem 0 0 0;
      color: #E93B3B;
      line-height: .18rem;
      font-size: .13rem;
    }
  }
}
</style>
