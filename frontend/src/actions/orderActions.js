import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,

}  from '../constants/orderConstant'




/**
 * @descrption SEND REQUEST TO OUR API TO CREATE AN ORDER
 * @param {allow us to dispatch an action} dispatch
 * @param {allow us to access our state} getState 
 * @param {The order to create with all items} order
 */
export const createOrder = (order) => async (dispatch, getState) => {

    try {

        // dispatch the first action
        dispatch({
            type:ORDER_CREATE_REQUEST
        })

        //destructure: getState().userLogin.userInfo to get the token
        const { userLogin: { userInfo } } = getState()

        //config for axios
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.post(`/api/orders`, order, config)

        // dispatch the second action
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



/**
 * @descrption SEND REQUEST TO OUR API TO GET ONE ORDER DATILS
 * @param {allow us to dispatch an action} dispatch
 * @param {allow us to access our state} getState 
 * @param {The order to create with all items} order
 */
export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {

        // dispatch the first action
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        //destructure: getState().userLogin.userInfo to get the token
        const { userLogin: { userInfo } } = getState()

        //config for axios
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.get(`/api/orders/${id}`, config)

        // dispatch the second action
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


/**
 * @descrption SEND REQUEST TO OUR API AND UPDATE AN ORDER TO PAY
 * @param { to dispatch an action} dispatch
 * @param { to access our state} getState 
 * @param { orderId} orderId
 * @param {paymentResult} paymentResult
 */
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {

    try {

        // dispatch the first action
        dispatch({
            type:ORDER_PAY_REQUEST
        })

        //destructure: getState().userLogin.userInfo to get the token
        const { userLogin: { userInfo } } = getState()

        //config for axios
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        // dispatch the second action
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

/**
 * @descrption SEND REQUEST TO OUR API AND UPDATE AN ORDER TO DELIVERED
 * @param { to dispatch an action} dispatch
 * @param { to access our state} getState 
 * @param { order} order
 */
export const deliverOrder = (order) => async (dispatch, getState) => {

    try {

        // dispatch the first action
        dispatch({
            type:ORDER_DELIVER_REQUEST
        })

        //destructure: getState().userLogin.userInfo to get the token
        const { userLogin: { userInfo } } = getState()

        //config for axios
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {} , config)

        // dispatch the second action
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

/**
 * @descrption SEND REQUEST TO OUR API TO GET THE LOGGED IN USER ORDERS
 * @param {allow us to dispatch an action} dispatch
 * @param {allow us to access our state} getState 
 */
export const myListOrder = () => async (dispatch, getState) => {

    try {

        // dispatch the first action
        dispatch({
            type:ORDER_MY_LIST_REQUEST
        })

        //destructure: getState().userLogin.userInfo to get the token
        const { userLogin: { userInfo } } = getState()

        //config for axios
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.get(`/api/orders/myorders`, config)

        // dispatch the second action
        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


/**
 * @descrption SEND REQUEST TO OUR API TO GET ALL ORDERS
 * @param {allow us to dispatch an action} dispatch
 * @param {allow us to access our state} getState 
 */
export const ListOrders = () => async (dispatch, getState) => {

    try {

        // dispatch the first action
        dispatch({
            type:ORDER_LIST_REQUEST
        })

        //destructure: getState().userLogin.userInfo to get the token
        const { userLogin: { userInfo } } = getState()

        //config for axios
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.get(`/api/orders`, config)

        // dispatch the second action
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
