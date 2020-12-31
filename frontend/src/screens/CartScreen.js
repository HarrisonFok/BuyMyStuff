import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// deal with redux states with functional components
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    // query params - including and after ?
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  
    const dispatch = useDispatch();
  
    // Grab items from redux for the cart items 
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  
    // only want to dispatch ADD_TO_CART if we have product id
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]);

    return <div>Cart</div>;
}

export default CartScreen
