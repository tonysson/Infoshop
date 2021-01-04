import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import FormContainer from './../components/FormContainer';
import {listProductDetails, updateProduct} from './../actions/productActions';
import { PRODUCT_UPDATE_RESET } from './../constants/productConstants';



const ProductEditScreen = ({history , match}) => {
     // get the product id in the url
    const productId = match.params.id

    //component state
    const [name , setName] = useState('')
    const [price , setPrice] = useState(0)
    const [image , setImage] = useState('')
    const [category , setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [description , setDescription] = useState('')
    const [countInStock , setCountInStock] = useState(0)
    const [uploading , setUploading] = useState(false)
   


    //call useDispatch to do an action
    const dispatch = useDispatch()
    //get our state by using useSelector
    // to get access to the redux state we use useSelector
    const productDetails = useSelector(state => state.productDetails)
     const productUpdate = useSelector(state => state.productUpdate)
    
    //destructure what we get 
    const { loading, error, product } = productDetails
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
    
    //useEffect
    useEffect(() => {

        // si tout va bien on reset le update
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            //when the component mount we want to fill the form with the product info based on his id
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setImage(product.image)
                setDescription(product.description)
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setBrand(product.brand)
            }
        }
            
    }, [ dispatch , productId ,history , product , successUpdate])


    // submit handler the form
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description,
        }))
    }

    // send request to our api to upload a file
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image' , file)
        setUploading(true)

        try {
            
            const config = {
                
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData , config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error.message)
            setUploading(false)
        }

    }


    return (
        <>
          <Link to='/admin/productlist' className='btn btn-light rounded my-3'>
              Go Back
          </Link>
          <FormContainer>
            <h1  style={{ textAlign: 'center' , color:'black' }}>
                Editer un article
            </h1>

           {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} 
           {loadingUpdate && <Loader/>}
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

               <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Nom
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='text'
                        placeholder='Entrer votre nom'
                        onChange={(e) => setName(e.target.value)}
                        value={name}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>
                          Prix
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='number'
                        placeholder='Entrer votre prix'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='image'>
                    <Form.Label>
                          Photo
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='text'
                        placeholder='Entrer URL  '
                        onChange={(e) => setImage(e.target.value)}
                        value={image}>
                    </Form.Control>
                    <Form.File
                    className='mt-2'
                    id='image-file'
                    onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader/>}
                </Form.Group>
                 <Form.Group controlId='brand'>
                    <Form.Label>
                          La marque
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='text'
                        placeholder='La marque du produit '
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='countInStock'>
                    <Form.Label>
                          Stocke
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='number'
                        placeholder='combien en stocke'
                        onChange={(e) => setCountInStock(e.target.value)}
                        value={countInStock}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='category'>
                    <Form.Label>
                          Categorie
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='text'
                        placeholder='Entrer sa categorie  '
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='description'>
                    <Form.Label>
                          Description
                        </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='text'
                        placeholder='Decrire le produit'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}>
                    </Form.Control>
                </Form.Group>
                <Button
                    style={{ letterSpacing: '5px' }}
                    type="submit"
                    variant='primary'
                    className='search__button'>
                    Sauvegarder
                </Button>
            </Form>
           )}
        </FormContainer>  
        </>
    )
}

export default ProductEditScreen
