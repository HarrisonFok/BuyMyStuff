import React, {useEffect} from 'react'
import {Route} from "react-router-dom";
// fire an action - useDispatch; bring something in from redux - useSelector
import {useDispatch, useSelector} from "react-redux"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// wrap bootstrap components
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useHistory } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    let history = useHistory()

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
    })

    const logoutHandler = () => {
        // console.log("logout")
        dispatch(logout())
    }

    // console.log("userInfo: ", userInfo)
    
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>BuyMyStuff</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* If we just put this here and we search, history will be undefined (no access to match in the header) */}
                                {/* <SearchBox /> */}
                            {/* We have access to props.history below, so we include this Route to pass in history to the SearchBox */}
                            <Route render={({history}) => <SearchBox history={history}/>}/>
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo && Object.entries(userInfo).length !== 0 ? 
                                (
                                    // allow the user to have a dropdown to either profile or logout
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        <LinkContainer to="/questions">
                                            <NavDropdown.Item>Ask Questions</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                ) :
                                (
                                    <LinkContainer to="/login">
                                        <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                                    </LinkContainer>
                                )
                            }
                            {userInfo && userInfo.isAdmin && 
                                (
                                    <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userList">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productList">
                                        <NavDropdown.Item>Product</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderList">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
