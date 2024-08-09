import {Component} from 'react'
import RestaurantAppContext from './context/RestaurantAppContext'
import Home from './component/Home'
import './App.css'

// write your code here

class App extends Component {
  state = {cartList: []}

  onProductData = (dishId, quantity) => {
    this.setState(prevState => {
      // Check if the dishId exists in the productData
      const dishExists = prevState.cartList.some(each => each.dishId === dishId)

      if (dishExists) {
        // Update the quantity if dishId exists
        return {
          cartList: prevState.cartList.map(each => {
            if (each.dishId === dishId) {
              console.log(`Updating dishId ${dishId} with quantity ${quantity}`)
              return {...each, quantity}
            }
            return each
          }),
        }
      } else {
        // Add a new entry if dishId does not exist
        console.log(`Adding new dishId ${dishId} with quantity ${quantity}`)
        return {
          cartList: [...prevState.cartList, {dishId, quantity}],
        }
      }
    })
  }
  /*

  onAddItemToCart = dish => {
    const {cartList} = this.state
    console.log(dish)
    // undefined !== dish ? console.log(dish) : console.log('false')

    let isAlreadyExists = false
    if (dish !== undefined) {
      cartList.filter(item => {
        if (item.dishId === dish.dishId) {
          isAlreadyExists = true
        } else {
          isAlreadyExists = false
        }
      })
    }

    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    } else {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({cartList: [...prevState.cartList, newDish]}))
    }
  }

  onRemoveItemFromCart = dish => {
    const {cartList} = this.state
    let isAlreadyExists
    if (dish !== undefined) {
      isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)
    }
    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }
  */

  render() {
    const {cartList} = this.state

    return (
      <RestaurantAppContext.Provider
        value={{
          cartList,
          onClickAddItem: this.onAddItemToCart,
          onClickRemoveItem: this.onRemoveItemFromCart,
          onProductData: this.onProductData,
        }}
      >
        <Home />
      </RestaurantAppContext.Provider>
    )
  }
}

export default App
/*
onClickAddItem: this.addItemToCart(),
          onClickRemoveItem: this.removeItemFromCart(),
          */
