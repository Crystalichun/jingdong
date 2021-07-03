<template>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{calculations.totalPrice}}</b></div>
    <div class="order__btn" @click="() => handleSubmitClick(true)">提交订单</div>
  </div>
  <div class="mask"
       v-show="showContent"
       @click="() => handleSubmitClick(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台吗？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <button
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >取消订单</button>
        <button
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >确认支付</button>
      </div>
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage"/>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '@/effects/commonCartEffect'
import { post } from '@/utils/request'
import { useStore } from 'vuex'
import Toast, { useToastEffect } from '@/components/Toast'

const useMakeOrderEffect = (shopId, shopName, productList, showToast) => {
  const store = useStore()
  const router = useRouter()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const key in productList.value) {
      const product = productList.value[key]
      if (product.check) {
        products.push({ id: parseInt(product._id), num: product.count })
      }
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0 && !isCanceled) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      showToast('支付失败')
    }
  }
  return { handleConfirmOrder }
}

const useShowMaskEffect = () => {
  const showContent = ref(false)
  const handleSubmitClick = (status) => {
    showContent.value = status
  }
  return { showContent, handleSubmitClick }
}

export default {
  name: 'Order',
  components: { Toast },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { show, toastMessage, showToast } = useToastEffect()
    const { shopName, productList, calculations } = useCommonCartEffect(shopId)
    const { showContent, handleSubmitClick } = useShowMaskEffect()
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList, showToast)
    return {
      show,
      showContent,
      toastMessage,
      calculations,
      handleSubmitClick,
      handleConfirmOrder
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: $bgColor;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  background: rgba(0,0,0,0.50);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__content {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 3rem;
    height: 1.56rem;
    background: #FFF;
    text-align: center;
    border-radius: .04rem;
    padding: .24rem;
    &__title {
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
      margin: 0;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666666;
    }
    &__btns {
      display: flex;
      margin: .24rem .32rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      height: .32rem;
      border: 1px solid #4FB0F9;
      border-radius: 16px;
      font-size: 14px;
      padding: .06rem .12rem;
      &--first {
        background: #fff;
        color: #0091FF;
        margin-right: .12rem;
      }
      &--last {
        margin-left: .12rem;
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
}
</style>
