// useState = states in functional components
import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    // useEffect to make a request to the backend
    // - executed whenever the page is loaded
    // - however, it's complaining because it's looking at localhost:3000 (need to add proxy)
    useEffect(() => {
        const fetchProducts = async () => {
            // that returns a promise, so we use await
            // can't make useEffect async, so we create a function
            const {data} = await axios.get("/api/products")
            // change the list of products from the empty array to the data we get back from the endpoint
            setProducts(data);
        }
        fetchProducts()
    }, [])

    // dependencies (array): when you want this to fire off some side-effects if they change
    return (
        <>
            <h1>My Products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen

/*
GET http://localhost:3000/api/products 500 (Internal Server Error)
- this happens after we have the useEffect because we didn't define localhost:5000. If we did, we would get a cross-domain error
*/