import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
 } from './../constants/orderConstant';


/**
 * @description Order reducer
 * @param {state} state 
 * @param {action} action 
 */

 export const orderCreateReducer = (state = {}, action) => {

    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                loading:true,
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading:false,
                success:true,
                order:action.payload
            }    
        
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error:action.payload,
            }    

        default:
            return state    
    }
 }


 /**
 * @description ORDERDETAILS reducer
 * @param {state} state 
 * @param {action} action 
 */

 export const orderDetailsReducer = (state = {loading: true , orderItems:[] , shippingAddress:{}}, action) => {

    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading:false,
                order:action.payload
            }    
        
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error:action.payload,
            }    

        default:
            return state    
    }
 }


 /**
 * @description UPDATE ORDER TO PAY reducer
 * @param {state} state 
 * @param {action} action 
 */

 export const orderPayReducer = (state = {}, action) => {

    switch(action.type){
        case ORDER_PAY_REQUEST:
            return{
                loading:true,
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading:false,
                success:true
            }    
        
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error:action.payload,
            }    
        case ORDER_PAY_RESET:
            return{}

        default:
            return state    
    }
 }

 /**
 * @description UPDATE ORDER TO DELIVER reducer
 * @param {state} state 
 * @param {action} action 
 */

 export const orderDeliverReducer = (state = {}, action) => {

    switch(action.type){
        
        case ORDER_DELIVER_REQUEST:
            return{
                loading:true,
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading:false,
                success:true
            }    
        
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error:action.payload,
            }    
        case ORDER_DELIVER_RESET:
            return{}

        default:
            return state    
    }
 }

 /**
 * @description myOrderList Reducer
 * @param {state} state 
 * @param {action} action 
 */

 export const myOrderListReducer = (state = {orders:[] }, action) => {

    switch(action.type){
        case ORDER_MY_LIST_REQUEST:
            return{
                loading:true,
            }

        case ORDER_MY_LIST_SUCCESS:
            return {
                loading:false,
                orders:action.payload
            }    
        
        case ORDER_MY_LIST_FAIL:
            return {
                loading: false,
                error:action.payload,
            }    
        case  ORDER_MY_LIST_RESET:
            return{
                orders:[]
            }

        default:
            return state    
    }
 }


 /**
 * @description OrderList Reducer 
 * @param {state} state 
 * @param {action} action 
 * @access admin only
 */

 export const OrderListReducer = (state = {orders:[] }, action) => {

    switch(action.type){
        case ORDER_LIST_REQUEST:
            return{
                loading:true,
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading:false,
                success:true,
                orders:action.payload
            }    
        
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error:action.payload,
            }    
        case  ORDER_LIST_RESET:
            return{
                orders:[]
            }

        default:
            return state    
    }
 }