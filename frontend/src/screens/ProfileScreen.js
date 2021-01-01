// When we have a form, our form fields are going to be part of the component state
import React, {useState, useEffect}  from 'react'
import {Form, Button, Row, Col} from "react-bootstrap"
// Import these when we have to deal with redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from "../actions/userActions";

const ProfileScreen = ({location, history}) => {
    // Set component level states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails);
    // look at user reducer to know what is stored inside the state
    const {loading, error, user} = userDetails;

    // Check to see if the user is logged in
    const userLogin = useSelector(state => state.userLogin);
    // look at user reducer to know what is stored inside the state
    const {userInfo} = userLogin;

    // Check to see if the user profile is updated
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    // look at user reducer to know what is stored inside the state
    const {success} = userUpdateProfile;

    useEffect(() => {
        // Redirect if not logged in
        if (!userInfo) {
            history.push("/login")
        } else {
            if (!user.name) {
                // so that in the action, "profile" gets passed in and it'll reach /api/users/profile (and not a user id)
                dispatch(getUserDetails("profile"))
            } else {
                // auto set in the form fields
                setName(user.name)
                setEmail(user.email)
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
        </Col>
    </Row>
}

export default ProfileScreen