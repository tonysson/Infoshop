import React, { useEffect , useState } from 'react'
import { Row,  Col , ListGroup , Image, Card , Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from './../components/Message';
import {getOrderDetails , payOrder, deliverOrder } from './../actions/orderActions';
import Loader from './../components/Loader';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET} from './../constants/orderConstant';
import moment from 'moment';





const OrderScreen = ({match , history}) => {

    const [sdkReady , setSdkReady] = useState(false)

    //get the order id in the url
    const orderId = match.params.id

    //useDispatch to use dispatch
    const dispatch = useDispatch()
    // to access our state
    const orderDetails = useSelector(state => state.orderDetails)
    const orderDeliver = useSelector(state => state.orderDeliver)
     const {userInfo} = useSelector(state => state.userLogin)
    const {order , loading , error} = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay , success:successPay} = orderPay
    const {loading:loadingDeliver , success:successDeliver} = orderDeliver


    if(!loading){
         // converts
    const addDecimals = num => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    //calculate price
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    }


    useEffect(() => {

        if(!userInfo) {
            history.push('/login')
        }

        // configuration de payPal script
        const addPayPalScrypt = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        // IMPORTANT: in the first condition we keep loading our order details even if it is not paid or there is not another order
        //in the second condition if the order is not paid we want to load ou paypal script
        if(!order || order._id !== orderId || successPay || successDeliver) {
        
        // To avoid the fact that when we paid it keep on refreshing we dispacth ORDER_PAID_RESET action
        dispatch({type: ORDER_PAY_RESET})   
        dispatch({type: ORDER_DELIVER_RESET})   

        // dispatch our getOrderDetails action
        dispatch(getOrderDetails(orderId))

        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScrypt()
            }
        }else{
            setSdkReady(true)
        }
    }, [dispatch , order , orderId , successPay , successDeliver, userInfo, history])

    // deliveredHandler
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    //succes payment handler
   const successPaymentHandler = (paymentResult) => {
    //    console.log(paymentResult);
       dispatch(payOrder(orderId , paymentResult))
   }


    return (
       
    loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <>
         {
             userInfo && !userInfo.isAdmin && (
                 <Link to="/profile" className="btn btn-light rounded my-3">
                    Go Back
                 </Link>
             )
         }
          <h4 className="py-3 mb-5 text-center">
              Numero de commande : <span  style={{ color:'#b71540'}}>
                  {order._id}
              </span>
          </h4>
           <Row>
            <Col md={8} >
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4 className='mb-2' style={{ color:'#b71540' , fontSize:'1rem'}}>
                          Addresse de livraison
                        </h4>
                        <p>
                            <strong style={{fontWeight:'bold'}}>
                            Nom : {order.user.name}
                            </strong>
                        </p>
                         <p>
                            <strong style={{fontWeight:'bold'}}>
                            Email : {order.user.email}
                            </strong>
                        </p>
                        <p>
                            <strong style={{fontWeight:'bold'}}>
                                Addresse: {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}
                            </strong>
                        </p>

                        {
                            order.isDelivered ? (
                                <Message variant='success'>
                                    Livré le {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='info'>
                                    Pas encore Livré
                                </Message>
                            )
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4 className="mb-2" style={{ color:'#b71540' , fontSize:'1rem'}}>
                            Methode de payement
                        </h4>
                        <p>
                            <strong style={{fontWeight:'bold'}}>
                            Methode: {order.paymentMethod}
                            </strong>
                        </p>
                        {
                            order.isPaid ? (
                                <Message variant='success'>
                                    Payé le {moment().locale(order.paidAt).format('LL')}
                                </Message>
                            ) : (
                                <Message variant='info'>
                                    Pas encore payé
                                </Message>
                            )
                        }
                    </ListGroup.Item>
                     <ListGroup.Item>
                        <h4 className="mb-2" style={{ color:'#b71540' , fontSize:'1rem'}}>
                           Les produits 
                        </h4>
                        {
                            order.orderItems.length === 0 ? <Message>Vous n'avez pas de commande</Message> : (
                                <ListGroup variant='flush'>
                                    {
                                        order.orderItems.map((item, index) => (
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
                                  {order.itemsPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Frais de livraison</Col>
                                <Col>
                                  {order.shippingPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Taxe</Col>
                                <Col>
                                  {order.taxPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Totale</Col>
                                <Col>
                                  {order.totalPrice} €
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {order && !order.isPaid && userInfo && !userInfo.isAdmin && (
                            <ListGroup.Item>
                             {loadingPay && <Loader/>}   
                             {!sdkReady ? <Loader/> : (
                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                             )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader/>}
                        {
                            userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button onClick={deliverHandler} type='button' className="btn btn-block rounded search__button">
                                     Marquer comme livré
                                    </Button>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
    )
}

export default OrderScreen
