import React, { useEffect } from 'react'
import { Button , Row,  Col , ListGroup , Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './../components/CheckoutSteps';
import Message from './../components/Message';
import { createOrder } from './../actions/orderActions';




const PlaceOrderScreen = ({history}) => {
    
    //useDispatch to use dispatch
    const dispatch = useDispatch()

    //Get our cart in the state
    const cart = useSelector(state => state.cart);
   
   // converts
    const addDecimals = num => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    //calculate price
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number((0.10 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    //get our orderCreate State
     const orderCreate = useSelector(state => state.orderCreate)
     const {order , success , error} = orderCreate


     useEffect(() => {
         if(success){
            history.push(`/order/${order._id}`)
         }
         // eslint-disable-next-line
     }, [history , success ])

    //placeOrder Handler method
  const placeOrderHandler = () => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice:cart.totalPrice
    }))
}


    return (
        <>
        <CheckoutSteps step1 step2 step3 step4  />

        <Row>
            <Col md={8} >
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4 className='mb-2' style={{ color:'#b71540' , fontSize:'1rem'}}>
                          Addresse de livraison
                        </h4>
                        <p>
                            <strong style={{fontWeight:'bold'}}>
                                Addresse: {cart.shippingAddress.address}, {cart.shippingAddress.postalCode} {cart.shippingAddress.city}, {cart.shippingAddress.country}
                            </strong>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4 className="mb-2" style={{ color:'#b71540' , fontSize:'1rem'}}>
                            Methode de payement
                        </h4>
                        <strong style={{fontWeight:'bold'}}>
                            Methode: {cart.paymentMethod}
                        </strong>
                    </ListGroup.Item>
                     <ListGroup.Item>
                        <h4 className="mb-2" style={{ color:'#b71540' , fontSize:'1rem'}}>
                           Les produits 
                        </h4>
                        {
                            cart.cartItems.length === 0 ? <Message>Votre panier est vide</Message> : (
                                <ListGroup variant='flush'>
                                    {
                                        cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                      <Link to={`/product/${item.product}`}>
                                                          {item.name}
                                                      </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x {item.price} € = {item.qty * item.price} €
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            )
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4 style={{color:'#b71540' , fontWeight:'bold'}} className=" text-center mb-2">
                                Resumé
                            </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total hors taxe</Col>
                                <Col>
                                  {cart.itemsPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Frais de livraison</Col>
                                <Col>
                                  {cart.shippingPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Taxe</Col>
                                <Col>
                                  {cart.taxPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Totale</Col>
                                <Col>
                                  {cart.totalPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                      {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            style={{ letterSpacing: '5px' }}
                            onClick={placeOrderHandler}
                            type='button'
                            className='search__button' 
                            disabled={cart.cartItems.length === 0}>
                                Commander
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            
        </>
    )
}

export default PlaceOrderScreen
