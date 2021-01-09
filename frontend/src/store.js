// Where we connect all our reducers and middlewares

// combineReducers - bunch of reducers, each one handling a piece of functionality
// - eg. if fetching products from backend, will have reducer for product list (request, success, fail)
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, orderListMyReducer, orderListReducer } from './reducers/orderReducers';
import { questionsReducer } from './reducers/questionReducers';

// will have multiple reducers handling a certain piece of functionalities (eg. reducer for product)

// the keys will show in the redux store
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    questionsList: questionsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer
})

const localStorageCartItem = localStorage.getItem("cartItems");
const cartItemsFromStorage = localStorageCartItem
  ? JSON.parse(localStorageCartItem)
  : [];

const localStorageUserInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = localStorageUserInfo
  ? JSON.parse(localStorageUserInfo)
  : [];

const localStorageShippingAddress = localStorage.getItem("shippingAddress");
const shippingAddressFromStorage = localStorageShippingAddress
  ? JSON.parse(localStorageShippingAddress)
  : {};

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store; 