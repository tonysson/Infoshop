import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL ,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from './../constants/productConstants';

 import axios from 'axios';   


 /**
  * @description action that allow us to make request to our API and get all the products
  */

export const listProducts = (keyword = '', pageNumber ='') => async (dispatch) => {

     try {
         
        dispatch({type: PRODUCT_LIST_REQUEST})
        
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload: data
        })

     } catch (error) {
         
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
     }
}


/**
  * @description action that allow us to make request to our API and get a single product based on it id
  */

export const listProductDetails = (id) => async (dispatch) => {

    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


/**
 * @description SEND REQUEST TO OUR API AND DELETE AN PRODUCT
 * @param {ID} id
 * @access Private/admin
 */
export const deleteProduct = (id) => async (dispatch , getState) => {

    try {

        // dispatch the first action
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        //destructure: getState().userLogin.userInfo
        const {userLogin : {userInfo}} = getState()

        //config for axios
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
         await axios.delete(`/api/products/${id}`,config)

        // dispatch the second action
        dispatch({type: PRODUCT_DELETE_SUCCESS});

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
} 

/**
 * @description SEND REQUEST TO OUR API TO CREATE PRODUCT
 */

export const createProduct = () => async (dispatch  , getState) => {

    try {

        // dispatch the first action
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

         //destructure: getState().userLogin.userInfo
        const {userLogin : {userInfo}} = getState()

        //config for axios
        const config = {
            headers: {
               
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.post(`/api/products`, {} , config)

        // dispatch the second action
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

/**
 * @description SEND REQUEST TO OUR API TO UPDATE PRODUCT
 */

export const updateProduct = (product) => async (dispatch  , getState) => {

    try {

        // dispatch the first action
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

         //destructure: getState().userLogin.userInfo
        const {userLogin : {userInfo}} = getState()

        //config for axios
        const config = {
            headers: {
               'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
        const { data } = await axios.put(`/api/products/${product._id}`, product , config)

        // dispatch the second action
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

/**
 * @description SEND REQUEST TO OUR API TO CREATE REVIEWS
 * @access Private 
 */

export const createReviews = (productId , review) => async (dispatch  , getState) => {

    try {

        // dispatch the first action
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

         //destructure: getState().userLogin.userInfo
        const {userLogin : {userInfo}} = getState()

        //config for axios
        const config = {
            headers: {
               'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //send request to our api
         await axios.post(`/api/products/${productId}/reviews`, review , config)

        // dispatch the second action
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


/**
  * @description action that allow us to make request to our API and get top rated product
  */

export const listTopProducts = () => async (dispatch) => {

     try {
         
        dispatch({type: PRODUCT_TOP_REQUEST})
        
        const {data} = await axios.get(`/api/products/top`)

        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload: data
        })

     } catch (error) {
         
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
     }
}
