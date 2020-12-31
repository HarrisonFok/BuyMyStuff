import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from '../components/Rating';
import axios from "axios";

const ProductScreen = ({match}) => {
    // match.params.id because we put /:id in the URL
    const [product, setProduct] = useState({})

    // useEffect to make a request to the backend
    // - executed whenever the page is loaded
    // - however, it's complaining because it's looking at localhost:3000 (need to add proxy)
    useEffect(() => {
        const fetchProduct = async () => {
            // that returns a promise, so we use await
            // can't make useEffect async, so we create a function
            const {data} = await axios.get(`/api/products/${match.params.id}`)
            // change the list of products from the empty array to the data we get back from the endpoint
            setProduct(data);
        }
        fetchProduct()
    }, [match])

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen