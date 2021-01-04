import React, { useState } from 'react'
import { Form, Button , Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './../components/FormContainer';
import { savePayementMethod } from './../actions/cartActions';
import CheckoutSteps from './../components/CheckoutSteps';


const PaymentScreen = ({history}) => {

    //get our cart from the state by using useSelector
    const cart = useSelector(state => state.cart)
    //get our shippingAddress from cart
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod , setPaymentMethod] = useState('Paypal')
    

    //dispatch actiion
    const dispatch = useDispatch()

    // submitHandler
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePayementMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <>
          <CheckoutSteps step1 step2  />
          <FormContainer>
           <h1 className="mb-4"  style={{ textAlign: 'center' , color:'#b71540' }}>Mode de payement</h1>
           <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    
                <Col>
                    <Form.Check 
                    type='radio' 
                    label='Paypal ou Credit Card' 
                    id='Paypal' 
                    name='paymentMethod' 
                    value='Paypal' 
                    checked 
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                 </Form.Group>
                <Button style={{ letterSpacing: '5px' }} type="submit" variant='primary' className="search__button">
                    Continuer
                </Button>
           </Form>
        </FormContainer>
        </>
    )
}

export default PaymentScreen
