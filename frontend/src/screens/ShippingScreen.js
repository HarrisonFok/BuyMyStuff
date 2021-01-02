// When we have a form, our form fields are going to be part of the component state
import React, {useState}  from 'react'
import {Form, Button} from "react-bootstrap"
// Import these when we have to deal with redux state
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

// When we submit the form, need history to push to redirect to payment screen
const ShippingScreen = ({history}) => {
    // Get the cart from redux, and then shipping address to cart
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address) 
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push("/payment")
    }

    return (
        <FormContainer>
            {/* The shipping screen is just the second step */}
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" required
                                    value={address} onChange={(e) => setAddress(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" required
                                    value={city} onChange={(e) => setCity(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter postal code" required
                                    value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter country" required
                                    value={country} onChange={(e) => setCountry(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen