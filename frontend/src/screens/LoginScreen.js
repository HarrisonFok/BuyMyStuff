// When we have a form, our form fields are going to be part of the component state
import React, {useState, useEffect}  from 'react'
import {Link} from "react-router-dom"
import {Form, Button, Row, Col} from "react-bootstrap"
// Import these when we have to deal with redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login} from "../actions/userActions";
import FormContainer from '../components/FormContainer';

const LoginScreen = ({location, history}) => {
    // Set component level states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    // look at user reducer to know what is stored inside the state
    const {loading, error, userInfo} = userLogin;

    // loction.search has the URL query string
    const redirect = location.search ? location.search.split("=")[1] : "/";

    // Redirect if logged in
    useEffect(() => {
        // i.e. logged in
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch login
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                                  value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" 
                                  value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen