// Where we connect all our reducers and middlewares

// combineReducers - bunch of reducers, each one handling a piece of functionality
// - eg. if fetching products from backend, will have reducer for product list (request, success, fail)
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from './reducers/orderReducers';

// will have multiple reducers handling a certain piece of functionalities (eg. reducer for product)

// the keys will show in the redux store
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer
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