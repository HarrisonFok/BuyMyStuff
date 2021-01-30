// useState = states in functional components
import React, {useEffect} from 'react'
// useDispatch - to call (dispatch) an action
// useSelector - select part of the state
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../actions/productActions';
import {Row, Col, Button} from "react-bootstrap"
import Product from "../components/Product";
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from "../components/Paginate";
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const HomeScreen = ({match, history}) => {
    // Called keyword because we set that in App.js (/:keyword)
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    // use same name as we did in store.js - want to get that piece of state
    const productList = useSelector(state => state.productList);
    // all the possible states (seen in reducer)
    const {loading, error, products, page, pages} = productList

    // useEffect to make a request to the backend
    // - executed whenever the page is loaded
    // - however, it's complaining because it's looking at localhost:3000 (need to add proxy)
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    // keyword has to be added so that when the user types in something different (i.e. keyword changes), the component will re-render
    }, [dispatch, keyword, pageNumber])

    const toChatApp = () => {
        console.log("chat app")
    }

    // depedencies (array): when you want this to fire off some side-effects if they change
    return (
        <>
            <Meta />
            <Button onClick={toChatApp}>Chatt App</Button>
            {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">Go Back</Link>}
            <h1>My Products</h1>
            {/* if error then output error */}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                    (
                        <>
                            <Row>
                                {products.map(product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        {/* <h3>{product.name}</h3> */}
                                        <Product product={product}/>
                                    </Col>
                                ))}
                            </Row>
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
                        </>
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