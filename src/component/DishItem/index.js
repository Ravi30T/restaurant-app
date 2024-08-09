import {useContext, useEffect, useState} from 'react'
import RestaurantAppContext from '../../context/RestaurantAppContext'

import './index.css'

const DishItem = props => {
  const {dishDetails, onIncrease, onDecrease} = props
  const [quantity, setQuantity] = useState(0)

  const {
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImg,
    dishCalories,
    dishCustomizations,
    dishAvailability,
    dishId,
  } = dishDetails

  // undefined !== dishDetails ? console.log(dishDetails) : console.log('false')

  // const [quantity, setQuantity] = useState(0)
  const {onClickAddItem} = useContext(RestaurantAppContext)
  const {onClickRemoveItem} = useContext(RestaurantAppContext)
  const {cartList, onProductData} = useContext(RestaurantAppContext)

  const getQuantity = () => {
    const cartItem = cartList.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1)
    onProductData(dishId, quantity + 1)
    onIncrease()
  }

  const onDecreaseQuantity = () => {
    quantity <= 1 ? setQuantity(0) : setQuantity(quantity - 1)
    if (quantity !== 0) {
      onProductData(dishId, quantity - 1)
      onDecrease()
    }
  }

  let currentFoodQuantity = 0

  cartList.filter(each => {
    if (each.dishId === dishId) {
      currentFoodQuantity = each.quantity
    }
  })

  useEffect(() => {
    setQuantity(currentFoodQuantity)
  }, [])

  const renderControllerButton = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  const dishMark = dishType === 1 ? 'non-veg-mark' : 'veg-mark'
  const dishMarkBorder = dishType === 1 ? 'non-veg-border' : 'veg-border'

  return (
    <li className="dish-item-container">
      <div className={dishMarkBorder}>
        <div className={dishMark} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not available</p>
        )}
        {dishCustomizations.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>

      <div className="calories-container">
        <p className="dish-calories text-warning">{dishCalories} calories</p>
      </div>

      <div className="dish-img-container">
        <img className="dish-image" alt={dishName} src={dishImg} />
      </div>
    </li>
  )
}

export default DishItem
