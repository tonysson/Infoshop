import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { register } from './../actions/userActions';
import FormContainer from './../components/FormContainer';

const RegisterScreen = ({history , location}) => {

    //component state
    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setmessage] = useState(null)

    //call useDispatch to do an action
    const dispatch = useDispatch()
    //get our state by using useSelector
    // to get access to the redux state we use useSelector
    const userRegister = useSelector(state => state.userRegister)
    //destructure what we get 
    const { loading, error, userInfo } = userRegister


    //Redirect user
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //useEffect
    useEffect(() => {
        //if the userInfo exist we stay login
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    // submit handler the form
    const submitHandler = (e) => {
        e.preventDefault()
        // check for password
        if(password !== confirmPassword){
            setmessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1 className='m-5' style={{ textAlign: 'center' , color:'black' }}>Inscription</h1>
            { message && <Message variant='danger'>{message}</Message>}
            { error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Nom
                    </Form.Label>
                    <Form.Control
                        className='rounded'
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
                    S'inscrire
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Vous avez déjà un compte ? &nbsp;
                     <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Connectez-vous
                     </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
