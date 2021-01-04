import React , {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Row , Col , Image , ListGroup , Card , Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import {useDispatch , useSelector} from 'react-redux'
import { listProductDetails , createReviews } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from './../components/Message';
import moment from 'moment'
import { PRODUCT_CREATE_REVIEW_RESET  } from './../constants/productConstants';
import Meta from '../components/Meta';
import Fade from 'react-reveal/Fade';
import ScrollOnTop from '../scrollOnTop';





const ProductScreen = ({match, history}) => {

    //component state
    const [qty , setQty] = useState(1);
    const [rating , setRating] = useState(0);
    const [comment , setComment] = useState(false);

    //call useDispatch
    const dispatch = useDispatch()
    //get our state by using useSelector
    const productDetails = useSelector((state) => state.productDetails)
    const reviewsCreate = useSelector(state => state.reviewsCreate);
    const {userInfo} = useSelector(state => state.userLogin);
    
    //destructuring from productDetails
    const { loading, error, product } = productDetails
    const {error: errorReview , success: successReview} = reviewsCreate

    //useEffect
    useEffect(() => {

        

        // si le review a été un success on remet tt a zero
        if(successReview){
            alert('Avis envoyé')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        //on dispatch notre listProductDetails action
        dispatch(listProductDetails(match.params.id))

    }, [match , dispatch, successReview , history])

    // verify if the user has already review the product
    const alreadyReviewed = userInfo && product.reviews && product.reviews.find(review => review.user.toString() ===  userInfo._id.toString())

    // add to cart functionality
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    // add review submit handler
    const submitHandler = (e) =>  {
        e.preventDefault()
        dispatch(createReviews(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link to="/" className="btn btn-light rounded my-3">
                Go Back
            </Link>

            {
                loading ? <Loader/> 
                : error ? <Message variant='danger'>{error}</Message> 
                : <> 
                 <Fade bottom cascade={true}>
                    <Row>
                        <Meta title={product.name}/>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h6 style={{color:'#182C61', fontWeight:'bold' , fontSize:'0.8rem'}}>
                                            {product.name}
                                        </h6>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} avis `} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong style={{color:'#182C61', fontWeight:'bold'}}> Prix </strong> : <span style={{color:'#182C61', fontWeight:'bold'}} >{product.price} €</span> 
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong style={{color:'#182C61', fontWeight:'bold'}}>Description</strong> : {product.description} 
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Prix :
                                               </Col>

                                                <Col>
                                                    <strong style={{color:'#182C61', fontWeight:'bold'}}>
                                                        {product.price} €
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    <strong style={{color:'#182C61', fontWeight:'bold'}}>
                                                        {
                                                            product.countInStock > 0 ? 'En stock' : 'Stocke épuisé'
                                                        }
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                          <Form.Control 
                                                          className='rounded'
                                                          as="select" 
                                                          value={qty} 
                                                          onChange={(e) => setQty(e.target.value)} >
                                                          {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                          }
                                                          </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }
                                        <ListGroup.Item>
                                            <Button 
                                                onClick={addToCartHandler}
                                                disabled={product.countInStock === 0}
                                                className="search__button" 
                                                type="button">
                                                Ajouter
                                             </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        </Fade>
                        <Row>
                            <Col md={6}>
                             <h4 className="mt-3 text-center">Avis</h4>
                             {
                                 product.reviews && product.reviews.length === 0 && (<Message>Aucun avis pour l'instant</Message>)
                                 
                             }
                             <ListGroup variant='flush'>
                                {
                                    product.reviews && product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <p>
                                               <strong style={{color:'#182C61', fontWeight:'bold'}}>  {review.name}
                                               
                                               </strong> 
                                               <small>
                                                   ({moment(review.createdAt).fromNow()})
                                               </small>
                                                <Rating value = {review.rating}/>
                                            </p>
                                            <p>
                                                {review.comment}
                                            </p>
                                        </ListGroup.Item>
                                    ))
                                }
                                <ListGroup.Item>
                                   
                                   {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                    {!alreadyReviewed && userInfo && (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>
                                                    Note
                                                </Form.Label>
                                                <Form.Control
                                                className='rounded' 
                                                onChange={(e) => setRating(e.target.value)}
                                                as='select' 
                                                value={rating}>
                                                    <option value=''>__Choisir__</option>
                                                    <option value="1">1 - Pas épaté</option>
                                                    <option value="2">2 - Satisfaisant</option>
                                                    <option value="3">3 - Bon produit</option>
                                                    <option value="4">4 - Tres bon produit</option>
                                                    <option value="5">5 - Excéllent produit</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>
                                                    Commentaire
                                                </Form.Label>
                                                <Form.Control
                                                className='rounded'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                as ='textarea' 
                                                rows='3' />
                                                
                                            </Form.Group>
                                            <Button type='submit'  className="search__button">
                                                Envoyer
                                            </Button>
                                        </Form>
                                    ) }
                                    {
                                        !userInfo && !alreadyReviewed &&  (
                                        <p>
                                            <Link to='/login'>Connectez-vous</Link> pour laisser un avis
                                        </p>
                                      )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                            </Col>
                        </Row>
                        <ScrollOnTop/>
                </>
            }

           
        </>
    )
}

export default ProductScreen






