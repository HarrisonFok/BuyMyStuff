// Where we connect all our reducers and middlewares

// combineReducers - bunch of reducers, each one handling a piece of functionality
// - eg. if fetching products from backend, will have reducer for product list (request, success, fail)
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// will have multiple reducers handling a certain piece of functionalities (eg. reducer for product)

const reducer = combineReducers({})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store; 