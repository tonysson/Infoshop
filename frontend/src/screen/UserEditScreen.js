import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { getUserDetails , updateUser } from './../actions/userActions';
import FormContainer from './../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';


const UserEditScreen = ({match , history}) => {

    // get the user id in the url
    const userId = match.params.id

    //component state
    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin , setIsAdmin] = useState(false)


    //call useDispatch to do an action
    const dispatch = useDispatch()
    //get our state by using useSelector
    // to get access to the redux state we use useSelector
    const userDetails = useSelector(state => state.userDetails)
    const userUpdate = useSelector(state => state.userUpdate)
    //destructure what we get 
    const { loading, error, user } = userDetails
    const {loading:loadingUpdate , error : errorUpdate , success:successUpdate} = userUpdate


    //useEffect
    useEffect(() => {

        // if update success we want to dispath the reset type and redirect to userList
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            //when the component mount we want to fill the form with the user info based on his id
            if(user && (!user.name || user._id !== userId)){
                dispatch(getUserDetails(userId))
            }else{
               if(user){
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
               }
            }
        }

    }, [user , dispatch , userId , successUpdate , history])


    // submit handler the form
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: userId , name, email , isAdmin}))
    }


    return (
        <>
          <Link to='/admin/userlist' className='btn btn-light rounded my-3'>
              Go Back
          </Link>
          <FormContainer>
            <h1 className='m-3' style={{ textAlign: 'center' , color:'black' }}>
                Mettre à jour&nbsp;?
            </h1>
           {loadingUpdate && <Loader/>}
           {errorUpdate && <Message variant='danger' >{errorUpdate}</Message>}
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

               <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Nom
                    </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1.5rem'}}
                        type='text'
                        placeholder='Entrer votre nom'
                        onChange={(e) => setName(e.target.value)}
                        value={name}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Addresse  Email
                        </Form.Label>
                    <Form.Control
                        className='rounded'
                        style={{color:'#182C61', fontWeight:'bold' , fontSize:'1.5rem'}}
                        type='email'
                        placeholder='Entrer votre Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='isAdmin'>
                    <Form.Check
                       style={{color:'#182C61', fontWeight:'bold' , fontSize:'1rem'}}
                        type='checkbox'
                        label='Is Admin'
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        checked={isAdmin}>
                    </Form.Check>
                </Form.Group>
                <Button
                    style={{ letterSpacing: '5px' }}
                    type="submit"
                    className='search__button'>
                    Sauvegarder
                </Button>
            </Form>
           )}
        </FormContainer>  
        </>
    )
}

export default UserEditScreen
