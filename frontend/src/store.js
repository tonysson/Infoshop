import { createStore , combineReducers , applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productListReducer , productDetailsReducer,productDeleteReducer , productCreateReducer, productUpdateReducer, reviewsCreateReducer, productTopRatedReducer} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer , userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer , orderDetailsReducer , orderPayReducer, myOrderListReducer , OrderListReducer ,orderDeliverReducer} from './reducers/orderReducers';



const reducer = combineReducers({

  // that will be our state in the redux dev tools
   productList: productListReducer, 
   productDetails : productDetailsReducer,
   productDelete : productDeleteReducer,
   productCreate : productCreateReducer,
   productUpdate:productUpdateReducer,
   productTopRated:productTopRatedReducer,
   cart : cartReducer,
   userLogin : userLoginReducer,
   userRegister : userRegisterReducer,
   userDetails : userDetailsReducer,
   userUpdateProfile: userUpdateProfileReducer,
   userDelete : userDeleteReducer,
   userUpdate : userUpdateReducer,
   userList :  userListReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay : orderPayReducer,
   myOrderList : myOrderListReducer,
   orderList : OrderListReducer,
   orderDeliver: orderDeliverReducer,
   reviewsCreate: reviewsCreateReducer,
  

  
})

//GET OUR CARTITEMS FROM LOCALSTORAGE
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

//GET OUR USERINFO FROM LOCALSTORAGE
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//GET THE USER SHIPPING ADDRESS FROM LOCALSTORAGE
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


//GET THE USER PAYMENTMETHOD FROM LOCALSTORAGE
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''


const initialState = {
  cart : {
    cartItems:cartItemsFromStorage ,
    shippingAddress:  shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: {userInfo: userInfoFromStorage}
}


const middleware = [thunk]

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store;