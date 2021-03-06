import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // use item as the payload
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );

      // Check if the item already exists
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
        return {
            ...state,
            cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        // data we pass into the form
        shippingAddress: action.payload
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        // data we pass into the form
        paymentMethod: action.payload
    };
    default:
      return state;
  }
};