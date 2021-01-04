import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col , Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { getUserDetails, updateUserProfile } from './../actions/userActions';
import { myListOrder } from '../actions/orderActions';
import moment from 'moment'
import {IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fade from 'react-reveal/Fade';
import { USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'



const ProfileScreen = ({history}) => {

    //component state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState(null)

    //call useDispatch to do an action
    const dispatch = useDispatch()
    //get our state by using useSelector
    // to get access to the redux state we use useSelector
    const userDetails = useSelector(state => state.userDetails)
    const userLogin = useSelector(state => state.userLogin)
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const myOrderList = useSelector(state => state.myOrderList)
    //destructure 
    const { loading, error, user } = userDetails
    const {userInfo} = userLogin
    const {success} = userUpdateProfile
    const {success:loadingSuccess , error:errorOrders , orders } = myOrderList

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{

            if(!user || !user.name || success){
                dispatch({type :  USER_UPDATE_PROFILE_RESET})
                //if we do not have the user name ; we send request to /api/users/profile by dispatching getUserDetails ,myOrderList action
                dispatch(getUserDetails('profile'))
                dispatch(myListOrder())
            }else{
                //if the user is there , we fill inputs by the user name and email
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo , user, history, success])

    // submit handler the form
    const submitHandler = (e) => {
        e.preventDefault()
        // check for password
        if (password !== confirmPassword) {
            setmessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({id:user._id , name, email, password}))
        }
    }



    return (
     <Fade bottom cascade={true}>
       <Row>
          
           <Col md={3}>
                <h4  style={{ textAlign: 'center' , color: '#b71540' }}>Mes Infos</h4>
                <span style={{marginLeft:'28px'}}>(Vous pouvez les modifier)</span>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Votre profile a été mis à jour</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                       
                        <Form.Control
                           className='rounded'
                           style={{color:'#182C61', fontWeight:'bold' , fontSize:'1.5rem'}}
                            type='name'
                            placeholder='Entrer votre nom'
                            onChange={(e) => setName(e.target.value)}
                            value={name}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                      
                        <Form.Control
                           className='rounded'
                            style={{color:'#182C61', fontWeight:'bold' , fontSize:'1.5rem'}}
                            type='email'
                            placeholder='Entrer votre Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>
                            Mot de passe
                    </Form.Label>
                        <Form.Control
                          className='rounded'
                            type='password'
                            placeholder='************'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>
                            Confirmer Mot de passe
                    </Form.Label>
                        <Form.Control
                            className='rounded'
                            type='password'
                            placeholder='************'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}>
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
           </Col>
           <Col md={9}>
                <h4 className='m-3' style={{ textAlign: 'center', color:'#b71540' }}>
                   Mes commandes
               </h4>
               {loadingSuccess ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : orders && orders.length === 0 ? (
                   <Message variant='info'>
                       Vous n'avez pas encore de commande. 
                   </Message>
               ) : (
                   <Table striped bordered hover responsive className='table-sm'>
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>DATE</th>
                               <th>TOTAL</th>
                               <th>PAYE</th>
                               <th>LIVRAISON</th>
                               <th></th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                              orders && orders.map((order) =>(
                                   <tr key={order._id}>
                                       <td style={{color:'#b71540' , fontWeight:'bold'}}>{order._id}</td>
                                       <td>{moment(order.createdAt).fromNow()}</td>
                                       <td style={{fontWeight:'bold'}}>{order.totalPrice} €</td>
                                       <td>
                                           {order.isPaid ? moment(order.paidAt).fromNow() : (
                                              <p style={{color:'red'}}>
                                                  Non
                                              </p>
                                           ) }
                                       </td>
                                        <td>
                                           {order.isDelivered ? moment(order.deliveredAt).fromNow() : (
                                              <p style={{color:'red'}}>
                                                  En cours
                                              </p>
                                           ) }
                                       </td>
                                       <td>
                                           
                                           <LinkContainer to={`/order/${order._id}`}>
                                             <IconButton>
                                               <VisibilityIcon />
                                           </IconButton>
                                           </LinkContainer>
                                       </td>
                                   </tr>
                               ))
                           }
                       </tbody>
                   </Table>
               )}
           </Col>
       </Row>
    </Fade>
    )
}

export default ProfileScreen
