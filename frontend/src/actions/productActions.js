import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL,} from "../constants/productConstants"
import axios from "axios";
// want to make an async request - redux-thunk allows you to add a function within a function

export const listProducts = () => async(dispatch) => {
    try {
        // Getting ready to send the request
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products")
        // in productReducer, when it's success, the payload will be matched to the "products" key
        dispatch({
            type: PRODUCT_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        // the message will get us the error message we got when we tried wrong things on postman
        // error.response.data.message is here because we have the custom middleware
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
} 

export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`)
        // in productReducer, when it's success, the payload will be matched to the "products" key
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data
        })
    } catch (error) {
        // the message will get us the error message we got when we tried wrong things on postman
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
} 

export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
  
        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // user is the data we want to update with
        await axios.delete(`/api/products/${id}`, config)
  
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
  } 

  // It's creating a sample product
  export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
  
        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // making a post request but not sending any data
        const {data} = await axios.post(`/api/products`, {}, config)
  
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
  }

  export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
  
        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // making a post request but not sending any data
        const {data} = await axios.put(`/api/products/${product._id}`, product, config)
  
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
  }

  export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
  
        const {userLogin: {userInfo}} = getState()
  
        // Send in header
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // making a post request but not sending any data
        await axios.post(`/api/products/${productId}/reviews`, review, config)
  
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
  }