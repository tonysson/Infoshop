import React , {useEffect , } from 'react';
import {useDispatch , useSelector}from 'react-redux';
import Message from './../components/Message';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup , Image , Form, Button, Card} from 'react-bootstrap';
import { addToCart , removeFromCart } from './../actions/cartActions';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton } from '@material-ui/core';
import Fade from 'react-reveal/Fade';




const CartScreen = ({match , location , history}) => {

    const productId = match.params.id 
    const qty = location.search ? Number(location.search.split('=')[1]) : 1 

    //call useDispatch
    const dispatch = useDispatch()
     //get our state by using useSelector
     const cart = useSelector(state => state.cart)
     const userLogin = useSelector(state => state.userLogin)
     //destructuring
     const {cartItems} = cart
     const {userInfo} = userLogin



    useEffect(() => {

        if(!userInfo){
            history.push('/login')
        }

        if(productId){
            dispatch(addToCart(productId , qty))
        }
    }, [dispatch , qty , productId, history , userInfo])

    //remove from cart
    const removeFromCartHandler = (id) => {
       dispatch(removeFromCart(id))
    }

    //checkout handler
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Fade left cascade={true}>
        <Row>
            <Col md={8}>
                <h1 className='m-5' style={{fontSize:'2rem' , color:'#b71540', textAlign:'center'}}>
                    <i  className="fa fa-shopping-cart" aria-hidden="true"></i> Votre panier
                </h1>
                {cartItems.length === 0 ? 
                <Message>
                  Votre panier est vide &nbsp; <Link to="/">Go Back</Link>
                </Message> : (
                    <ListGroup variant='flush'>
                        {
                            cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                   <Row>
                                       <Col md={2}>
                                           <Image src={item.image} alt={item.name} fluid rounded/>
                                       </Col>
                                       <Col md={3}>
                                         <Link to={`/product/${item.product}`}>
                                             {item.name}
                                         </Link>
                                       </Col>
                                        <Col md={4}>
                                           {item.price} €
                                        </Col>

                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(
                                                    addToCart(item.product , Number(e.target.value))
                                                )}>

                                                {
                                                    [...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                         <IconButton onClick={() => removeFromCartHandler(item.product)}>
                                                 <DeleteIcon style={{ color: 'red' }} />
                                         </IconButton>
                                        </Col>
                                   </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                )}
            </Col>
            <Col  md={4}>
              <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                            <h6>
                                Sous-total =
                                 ({cartItems.reduce((acc , item) => acc + item.qty , 0)})  
                                 &nbsp;produits
                            </h6>
                            <h6>
                                Total = {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} €
                            </h6>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Button 
                         onClick={checkoutHandler}
                         type="button" 
                         style={{ letterSpacing: '5px' }}
                         className="search__button"
                         disabled={cartItems.length === 0 }>
                            Payement
                         </Button>
                     </ListGroup.Item>
                  </ListGroup>
              </Card>
            </Col>
         </Row>
        </Fade>
    )
}

export default CartScreen
