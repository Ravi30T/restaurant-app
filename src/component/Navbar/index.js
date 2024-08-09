// import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import RestaurantAppContext from '../../context/RestaurantAppContext'

import './index.css'

const Navbar = props => {
  const {data, cartQuantity} = props
  const name = data.restaurantName

  // const {cartList} = useContext(RestaurantAppContext)
  // const cartQuantity = cartList.length

  return (
    <nav className="nav-bar">
      <div>
        <h1 className="website-logo"> {name} </h1>
      </div>
      <p> My Orders </p>

      <div className="cart-icon-container">
        <IoCartOutline className="cart-icon" />
        <div className="quantity-number-container">
          <p className="quantity-number"> {cartQuantity} </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
