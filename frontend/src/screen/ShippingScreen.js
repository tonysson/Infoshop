import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './../components/FormContainer';
import { saveShippingAddress } from './../actions/cartActions';
import CheckoutSteps from './../components/CheckoutSteps';




const ShippingScreen = ({history}) =>  {

    //get our cart from the state by using useSelector
    const cart = useSelector(state => state.cart)
    //get our shippingAddress from cart
    const {shippingAddress} = cart

    const [address , setAddress] = useState(shippingAddress.address)
    const [city , setCity] = useState(shippingAddress.city)
    const [postalCode , setPostalCode] = useState(shippingAddress.postalCode)
    const [country , setCountry] = useState(shippingAddress.country)

    //dispatch actiion
    const dispatch = useDispatch()

    // submitHandler
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address , city , postalCode, country}))
        history.push('/payement')
    }


    return (
        <>
        <CheckoutSteps step1 />
        <FormContainer>
           <h1  style={{ textAlign: 'center' , color: '#b71540' }}>Livraison</h1>
           <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>
                        Adresse de livraison
                    </Form.Label>
                    <Form.Control
                        type='text'
                        className='rounded'
                        required
                        placeholder='Entrer votre addresse'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address || ''}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>
                        Ville de livraison
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        type='text'
                        required
                        placeholder='Entrer votre ville'
                        onChange={(e) => setCity(e.target.value)}
                        value={city || ''}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>
                        Code postal
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        type='text'
                        required
                        placeholder='Entrer votre code postal'
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode || ''}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>
                    Pays de livraison
                    </Form.Label>
                    <Form.Control
                      className='rounded'
                        type='text'
                        required
                        placeholder='Entrer votre pays'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country || ''}>
                    </Form.Control>
                </Form.Group>
                <Button style={{ letterSpacing: '5px' }} type="submit" variant='primary' className="search__button">
                    Continuer
                </Button>
           </Form>
        </FormContainer>
        </>
    )
}

export default ShippingScreen;