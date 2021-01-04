import axios from "axios";
// When we have a form, our form fields are going to be part of the component state
import React, {useState, useEffect}  from 'react'
import {Link} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
// Import these when we have to deal with redux state
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProductDetails, updateProduct} from "../actions/productActions";
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    // Set component level states
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    // look at user reducer to know what is stored inside the state
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    // look at user reducer to know what is stored inside the state
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push("/admin/productList")
        } else {
            // if doesn't exist, then fetch user
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, history, productId, product, successUpdate])

    // We're making a HTTP request, so async
    const uploadFileHandler = async(e) => {
        // When we upload, we get access to e.target.files, which is an array
        const file = e.target.files[0]
        const formData = new FormData()
        // We called it "image" in the backend middleware
        formData.append("image", file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            // What we send back is the path
            const {data} = await axios.post("/api/upload", formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id: productId, name, price, image, brand, category, description, countInStock}))
    }

    return (
        <>
            <Link to="/admin/productList" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter email" 
                                        value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" 
                                        value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image URL" 
                                        value={image} onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter brand URL" 
                                        value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="number" placeholder="Enter count in stock" 
                                        value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter category" 
                                        value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" 
                                        value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>

    )
}

export default ProductEditScreen