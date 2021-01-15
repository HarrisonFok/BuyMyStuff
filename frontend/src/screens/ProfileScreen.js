// When we have a form, our form fields are going to be part of the component state
import React, {useState, useEffect}  from 'react'
import {Table, Form, Button, Row, Col} from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';
// Import these when we have to deal with redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {listMyOrders} from "../actions/orderActions";

const ProfileScreen = ({history}) => {
    // Check to see if the user is logged in
    const userLogin = useSelector(state => state.userLogin);
    // look at user reducer to know what is stored inside the state
    const {userInfo} = userLogin;

    const userDetails = useSelector(state => state.userDetails);
    // look at user reducer to know what is stored inside the state
    const {loading, error, user} = userDetails;

    // Set component level states
    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    // Check to see if the user profile is updated
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    // look at user reducer to know what is stored inside the state
    const {success} = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    // look at user reducer to know what is stored inside the state
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy;

    useEffect(() => {
        // Redirect if not logged in
        if (!userInfo) {
            history.push("/login")
        } else {
            if (!user) {
                // so that in the action, "profile" gets passed in and it'll reach /api/users/profile (and not a user id)
                dispatch(getUserDetails("profile"))
                // want it to display the list of my orders once the screen loads
                dispatch(listMyOrders())
            } else {
                // auto set in the form fields
                setName(name)
                setEmail(email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPwd) {
            setMessage("Passwords do not match")
        } else {
            // takes in a user object
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    return <Row>
        <Col md={3}>
        <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter email" 
                                  value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" 
                                  value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>
        </Col>
        {/* column for orders */}
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : error ? <Message variant="danger">{errorOrders}</Message> : 
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className="fas fa-times" style={{color: "red"}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className="fas fa-times" style={{color: "red"}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default ProfileScreen