import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = this.state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  return JSON.parse(localStorage.cartList) || {}
}

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
    cartList: getLocaCartList()
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
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList?.[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      for (const key in products) {
        products[key].check = true
      }
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
