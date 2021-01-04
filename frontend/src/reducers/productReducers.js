// This will handle the state for the product list on the home page

import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL,  PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } from "../constants/productConstants"

export const productListReducer = (state={ products: [] }, action) => {
    // 3 types: request, success, failure
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
           return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
} 

export const productDetailsReducer = (state={ product: { reviews: []} }, action) => {
    // 3 types: request, success, failure
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
           return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {  }, action) => {
    // 3 types: request, success, failure
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true, ...state };
      case PRODUCT_DELETE_SUCCESS:
        // because we didn't send anything back from server
        return { loading: false, success: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const productCreateReducer = (state = {  }, action) => {
    // 3 types: request, success, failure
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return { loading: true, ...state };
      case PRODUCT_CREATE_SUCCESS:
        // want to return the product
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_RESET:
        return {}
      default:
        return state;
    }
  };