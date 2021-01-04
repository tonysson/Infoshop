import React, {useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton } from '@material-ui/core';
import { ListOrders } from './../actions/orderActions';


const OrderListScreen = ({history}) => {

    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const userLogin = useSelector(state => state.userLogin)
    const {orders , error , loading} = orderList
    const {userInfo} = userLogin

    useEffect(()=> {

        if(userInfo && userInfo.isAdmin){
            dispatch(ListOrders())
        }else{
            history.push('/login')
        }

    } , [dispatch, history , userInfo])



    return (
        
         <>
         

           <h4 className='m-4 text-center' style={{ color:'black' , fontSize:'2rem'}}>
             LES COMMANDES
           </h4>

            {
                loading ? <Loader/> : error ? (
                     <Message variant='danger'>
                         {error}
                     </Message>
                ) : (
                    <Table striped bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th >CLIENT</th>
                                <th >DATE</th>
                                <th >PRIX</th>
                                <th >PAYE</th>
                                <th>RECU</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(order => (
                                <tr key={order._id}>
                                    <td style={{color:'#b71540'}}>
                                        {order._id}
                                    </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}}>
                                        {order.user && order.user.name}
                                    </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}} >
                                       {order.createdAt.substring(0,10)}
                                     </td>
                                     <td style={{color:'#182C61', fontWeight:'bold'}} >
                                        {order.totalPrice} €
                                     </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}} >
                                       {
                                           order.isPaid ? (
                                               order.paidAt.substring(0, 10)
                                                ) : (
                                                <IconButton>
                                                  <CloseIcon  style={{ color: 'red' }} />
                                                </IconButton>
                                               )
                                       }
                                    </td>
                                    <td>
                                         {
                                             order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                                ) : (
                                                <IconButton>
                                                  <CloseIcon  style={{ color: 'red' }} />
                                                </IconButton>
                                               )
                                        }
                                    </td>
                                    <td>
                                         <LinkContainer to={`/order/${order._id}`}>
                                            <IconButton>
                                                <VisibilityIcon/>
                                            </IconButton>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default OrderListScreen
