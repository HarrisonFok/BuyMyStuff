// When we have a form, our form fields are going to be part of the component state
import React, {useState}  from 'react'
import {Form, Button, Col} from "react-bootstrap"
// Import these when we have to deal with redux state
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({history}) => {
    // Get the cart from redux, and then shipping address to cart
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    // Error checking: in case there's no shipping address, go back to shipping screen
    if (!shippingAddress) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal") 

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal"
                                    name="paymentMethod" value="PayPal" checked 
                                    onChange={(e) => setPaymentMethod(e.target.value)}>    
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen