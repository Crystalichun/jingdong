import { useStore } from 'vuex'
import { computed } from 'vue'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  const changeCartItemInfo = (shopId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productInfo, num
    })
  }

  const shopName = computed(() => {
    return cartList[shopId]?.shopName || ''
  })

  const productList = computed(() => {
    const products = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in products) {
      const product = products[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const calculations = computed(() => {
    const productList = cartList?.[shopId]?.productList || {}
    const result = { total: 0, totalPrice: 0, allChecked: true }
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        result.total += product.count
        if (product.check) {
          result.totalPrice += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  return { shopName, productList, calculations, cartList, changeCartItemInfo }
}
