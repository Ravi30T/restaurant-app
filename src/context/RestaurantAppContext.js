import React from 'react'

const RestaurantAppContext = React.createContext({
  cartList: [],
  onClickAddItem: () => {},
  onClickRemoveItem: () => {},
  onProductData: () => {},
})

export default RestaurantAppContext
