<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__edit">edit</div>
      <div class="header__info">
        <img
          class="header__info__avatar"
          src="http://www.dell-lee.com/imgs/avatar.jpg"
        />
        <div class="header__info__person">
          <div class="header__info__name">
            热心市民熊先生
          </div>
          <div class="header__info__acount">
            ID: 1069643013
          </div>
        </div>
        <div class="header__info__coupons">
          <template
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="header__info__coupons__item">
              <div class="header__info__coupons__name">{{item.name}}</div>
              <div class="header__info__coupons__count">{{item.count}}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="manage">
      <div
        class="manage__item"
        v-for="(item, index) in manageList"
           :key="index"
      >
        {{item}}<span class="iconfont manage__item__icon">&#xe6f2;</span>
      </div>
    </div>
  </div>
  <docker :currentIndex="3"/>
</template>

<script>
import Docker from '@/components/Docker'
import { toRefs, reactive } from 'vue'

const useCouponsEffect = () => {
  const data = reactive({ list: [] })
  data.list = [
    {
      name: '红包',
      count: 21
    },
    {
      name: '优惠券',
      count: 12
    },
    {
      name: '鲜豆',
      count: 59
    },
    {
      name: '白条',
      count: 100
    }
  ]
  const { list } = toRefs(data)
  return { list }
}

const useManageEffect = () => {
  const data = reactive({ manageList: ['我的钱包', '我的地址', '客服与帮助'] })
  const { manageList } = toRefs(data)
  return { manageList }
}

export default {
  name: 'Mine',
  components: { Docker },
  setup () {
    const { list } = useCouponsEffect()
    const { manageList } = useManageEffect()
    return { list, manageList }
  }
}
</script>

<style scoped  lang="scss">
.wrapper {
  bottom: .5rem;
}
.header {
  position: relative;
  height: 2.5rem;
  padding: 0 0.18rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  &__edit {
    float: right;
  }
  &__info {
    position: absolute;
    top: 1.08rem;
    height: 2rem;
    width: 3.4rem;
    background: #FFFFFF;
    box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
    border-radius: .08rem;
    &__avatar {
      width: 0.94rem;
      height: 0.94rem;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: -25%;
    }
    &__person {
      position: absolute;
      top: 0.45rem;
      width: 100%;
      left: 50%;
      padding: 0.12rem 0;
      transform: translate(-50%, 0);
      border-bottom: 1px solid #F1F1F1;
    }
    &__name {
      font-size: .24rem;
      color: #262628;
      text-align: center;
      line-height: 36px;
    }
    &__acount {
      font-size: 0.14rem;
      color: #C1C0C9;
      text-align: center;
      margin-top: .02rem;
    }
    &__coupons {
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      padding: .12rem 0 .16rem 0;
      &__item {
        width: 33%;
        text-align: center;
      }
      &__name {
        font-size: .12rem;
        color: #C1C0C9;
        line-height: .17rem;
        margin-bottom: .03rem;
      }
      &__count {
        font-size: .2rem;
        color: #262628;
        line-height: .28rem;
      }
    }
  }
}
.manage {
  background: #FFFFFF;
  box-shadow: 0 8px 16px 0 rgb(0 0 0 / 8%);
  border-radius: 8px;
  height: 100%;
  margin: .74rem .18rem 0  0.18rem;
  padding: 0 0.16rem;
  &__item {
    padding: .17rem 0;
    line-height: .2rem;
    font-size: 14px;
    color: #262626;
    &__icon {
      color: #C2C4CA;
      float: right;
      transform: rotate(180deg);
    }
  }
}
</style>
