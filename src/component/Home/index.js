import {Component} from 'react'

import Navbar from '../Navbar'
import TabItems from '../TabItems'
import DishItem from '../DishItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    foodData: [],
    categoryList: [],
    activeCategory: '',
    apiStatus: apiStatusConstants.initial,
    cartQuantity: 0,
  }

  componentDidMount() {
    this.getFoodData()
  }

  getFoodData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data[0])

    if (response.ok === true) {
      const dataVal = data[0]
      const updatedData = {
        branchName: dataVal.branch_name,
        nextUrl: dataVal.nextUrl,
        restaurantId: dataVal.restaurant_id,
        restaurantImg: dataVal.restaurant_image,
        restaurantName: dataVal.restaurant_name,
        tableId: dataVal.table_id,
        tableMenuList: dataVal.table_menu_list.map(menu => ({
          menuCategory: menu.menu_category,
          menuCategoryId: menu.menu_category_id,
          menuCategoryImg: menu.menu_category_image,
          categoryDishes: menu.category_dishes.map(dishes => ({
            dishId: dishes.dish_id,
            dishAvailability: dishes.dish_Availability,
            dishName: dishes.dish_name,
            dishCalories: dishes.dish_calories,
            dishCustomizations: dishes.addonCat,
            dishDescription: dishes.dish_description,
            dishCurrency: dishes.dish_currency,
            dishPrice: dishes.dish_price,
            dishImg: dishes.dish_image,
            dishType: dishes.dish_Type,
          })),
        })),
      }
      // console.log(updatedData.tableMenuList.categoryDishes)

      const tabsList =
        updatedData.tableMenuList !== undefined &&
        updatedData.tableMenuList.map(each => each.menuCategory)

      this.setState({
        foodData: updatedData,
        activeCategory: tabsList[0],
        apiStatus: apiStatusConstants.success,
      })

      /* console.log(
        updatedData.filter(
          each => each.tableMenuList.menuCategory === 'Salads and Soup',
        ),
      ) */
    }
  }

  renderCategoryDishes = () => {
    const {foodData, activeCategory} = this.state
    const {tableMenuList} = foodData
    // console.log(foodData)

    // console.log(tableMenuList.categoryDishes)

    let filterCategoryFood

    if (tableMenuList !== undefined) {
      filterCategoryFood = tableMenuList.find(
        each => each.menuCategory === activeCategory,
      ).categoryDishes
    }

    // console.log('filterCategoryFood')
    return (
      filterCategoryFood !== undefined && (
        <ul className="food-items-list-container">
          {filterCategoryFood.map(each => (
            <DishItem
              key={each.dishId}
              dishDetails={each}
              onIncrease={this.onIncrease}
              onDecrease={this.onDecrease}
            />
          ))}
        </ul>
      )
    )
  }

  onChangeTab = tabVal => {
    this.setState({activeCategory: tabVal})
  }

  onIncrease = () =>
    this.setState(prevState => ({cartQuantity: prevState.cartQuantity + 1}))

  onDecrease = () =>
    this.setState(prevState => ({
      cartQuantity:
        prevState.cartQuantity <= 1 ? 0 : prevState.cartQuantity - 1,
    }))

  render() {
    const {foodData, activeCategory, cartQuantity} = this.state

    return (
      <>
        <Navbar data={foodData} cartQuantity={cartQuantity} />

        <div className="tabs-container">
          {foodData.tableMenuList !== undefined &&
            foodData.tableMenuList.map(each => (
              <TabItems
                key={each.menuCategoryId}
                tab={each.menuCategory}
                onChangeTab={this.onChangeTab}
                isActive={activeCategory === each.menuCategory}
              />
            ))}
        </div>

        <div className="food-items-container">
          {this.renderCategoryDishes()}
        </div>
      </>
    )
  }
}

export default Home
