// useState = states in functional components
import React, {useEffect} from 'react'
// useDispatch - to call (dispatch) an action
// useSelector - select part of the state
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../actions/productActions';
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product";

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    // useEffect to make a request to the backend
    // - executed whenever the page is loaded
    // - however, it's complaining because it's looking at localhost:3000 (need to add proxy)
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    // use same name as we did in store.js - want to get that piece of state
    const productList = useSelector(state => state.productList);
    // all the possible states (seen in reducer)
    const {loading, error, products} = productList

    // dependencies (array): when you want this to fire off some side-effects if they change
    return (
        <>
            <h1>My Products</h1>
            {/* if error then output error */}
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : 
                    (
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    {/* <h3>{product.name}</h3> */}
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                    )
            }
        </>
    )
}

export default HomeScreen

/*
GET http://localhost:3000/api/products 500 (Internal Server Error)
- this happens after we have the useEffect because we didn't define localhost:5000. If we did, we would get a cross-domain error
*/