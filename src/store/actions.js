import {ADD_COUNTER,ADD_TO_CART} from "./modules-type";
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // state.cartList.push(payload)
      //1.payload新添加的商品
      // let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      //find函数会将item返回给oldProduct
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // console.log(oldProduct);
      //2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('商品数量加一')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('商品新加入购物车')
      }

    })
  }
}