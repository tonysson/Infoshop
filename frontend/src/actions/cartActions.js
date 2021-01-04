import axios from 'axios'
import { 
    CART_ADD_ITEM , 
    CART_REMOVE_ITEM , 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_RESET
} from './../constants/cartConstants';


/**
 * @description SEND REQUEST TO OUR API AND GET BACK INFO ABOUT THE ADDED PRODUCT TO THE CART
 * @param {product id} id 
 * @param {quantity product} qty 
 * @param {allow us to dispatch action} dispatch
 * @param {allow us to access the state : cart} getState
 * 
 */

 export const addToCart = (id , qty) => async (dispatch , getState) => {

    // we send request to our api to get info about the specifique product that is being added to the cart
    const {data} = await axios.get(`/api/products/${id}`)

    // get our data back
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product: data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    //set it into the localStorage
    // we want to store the entire cart , to get access to the state we use getState
     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

 }


/**
 * @description allow us to remove an item from the cart
 * @param {id} id 
 */

 export const removeFromCart = (id) => (dispatch , getState) => {
   
     // get our data back
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })

    //set the cart items intpo the localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

 }

 
 /**
 * @description allow us to save shipping address
 * @param {formData} data
 */

 export const saveShippingAddress = (data) => (dispatch) => {
   
     // get our data back
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    //set the cart items intpo the localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(data))

 }


 /**
 * @description allow us to save payement method
 * @param {data} data
 */

 export const savePayementMethod = (data) => (dispatch) => {
   
     // get our data back
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })

    //set the cart items intpo the localStorage
    localStorage.setItem('paymentMethod', JSON.stringify(data))

 }