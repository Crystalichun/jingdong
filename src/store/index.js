import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
    //   shopId: {
    //     productId: {
    //       _id: '1',
    //       name: '番茄250g/份',
    //       imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //       sales: 10,
    //       price: 33.6,
    //       oldPrice: 39.6,
    //       count: 2
    //     }
    //   }
    }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productInfo, num } = payload
      const shopInfo = state.cartList?.[shopId] || {}
      const productId = productInfo._id
      let product = shopInfo[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (product.count < 0) { product.count = 0 }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
