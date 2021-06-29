import { createStore } from 'vuex'

export default createStore({
  // shopId: {
  //   shopName: '',
  //   productList: {
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
  // }
  state: {
    cartList: {}
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productInfo, num } = payload
      const shopInfo = state.cartList?.[shopId] || {
        shopName: '', productList: {}
      }
      const productId = productInfo._id
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (product.count < 0) { product.count = 0 }
      if (num > 0) { product.check = true }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList?.[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      for (const key in products) {
        products[key].check = true
      }
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
