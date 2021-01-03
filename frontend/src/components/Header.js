import React from 'react'
// fire an action - useDispatch; bring something in from redux - useSelector
import {useDispatch, useSelector} from "react-redux"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// wrap bootstrap components
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const logoutHandler = () => {
        // console.log("logout")
        dispatch(logout())
    }
    
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
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? 
                                (
                                    // allow the user to have a dropdown to either profile or logout
                                    <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
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
