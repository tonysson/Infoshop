import { 
    CART_ADD_ITEM  , 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from './../constants/cartConstants';


/**
 * @description cart Reducer
 * @param {state} state 
 * @param {action} action 
 */
export const cartReducer = (state = {cartItems:[] , shippingAddress:{}} , action) => {

    switch(action.type){

        case CART_ADD_ITEM : 
          
        const item = action.payload // what we'll get

        //on verifir si le produit exist deja ds notre cart
        // x.product === id is the item store in product
        const existItem = state.cartItems.find(x => x.product === item.product)

        if(existItem){

            return {
                ...state,
                cartItems : state.cartItems.map(x => x.product === existItem.product ? item : x )
            }

        }else{
            //we push it in the array
            return {
                ...state,
                cartItems:[...state.cartItems , item]
            }
        }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress : action.payload
            }  
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod : action.payload
            }
        default:
            return state
    }

}
