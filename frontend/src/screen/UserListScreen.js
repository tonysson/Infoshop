import React, {useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { listUsers, deleteUser } from './../actions/userActions';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton } from '@material-ui/core';


const UserListScreen = ({history}) => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const userLogin = useSelector(state => state.userLogin)
    const userDelete = useSelector(state => state.userDelete)
    const {loading , error , users} = userList
    const {userInfo} = userLogin
    const {success: successDelete} = userDelete

    useEffect(() => {
       
        // The condition allow us to manage the security issues
        if(userInfo && userInfo.isAdmin){
             dispatch(listUsers())
        }else{
            history.push('/login')
        }

    },[dispatch , history , successDelete, userInfo])


    // deletetHandler
    const deleteHandler = (id) => {
        if(window.confirm('Etes-vous sûrs?')){
             dispatch(deleteUser(id))
        }
    }

    return (

        <>
           <h4 className='m-4 text-center' style={{ color:'black' , fontSize:'2rem'}}>
            LES CLIENTS
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
                                <th >NAME</th>
                                <th  >EMAIL</th>
                                <th >ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(user => (
                                <tr key={user._id}>
                                    <td style={{color:'#b71540'}}>
                                        {user._id}
                                    </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}}>
                                        {user.name}
                                    </td>
                                     <td style={{color:'#182C61', fontWeight:'bold'}} >
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.isAdmin? (
                                         <IconButton>
                                              <CheckIcon fontSize="large" style={{ color: '#009432' }} /> 
                                         </IconButton>
                                        ):(
                                           <IconButton>
                                               <CloseIcon fontSize="large"  style={{ color: 'red' }} />
                                           </IconButton>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                        </LinkContainer>
                                        <IconButton 
                                        onClick={
                                            (e) => {
                                                 e.preventDefault()
                                                 deleteHandler(user._id)
                                            }
                                        }>
                                            <DeleteIcon style={{ color: 'red' }} />
                                        </IconButton>
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

export default UserListScreen
