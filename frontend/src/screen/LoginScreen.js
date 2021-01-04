import React , {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Form , Button , Row , Col} from 'react-bootstrap';
import {useDispatch , useSelector} from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import { login } from './../actions/userActions';
import FormContainer from './../components/FormContainer';




const LoginScreen = ({location , history}) => {

    //component state
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    //call useDispatch to do an action
    const dispatch = useDispatch()
    //get our state by using useSelector
    // to get access to the redux state we use useSelector
    const userLogin = useSelector(state => state.userLogin)
    //destructure what we get 
    const {loading , error , userInfo} = userLogin


    //Redirect user
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //useEffect
    useEffect(() =>{
        //if the userInfo exist we stay login
        if(userInfo){
            history.push(redirect)
        }
    }, [history , userInfo , redirect])


    // submit handler the form
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email , password))
    }

    return (
            <FormContainer>
                <h1 className='m-5' style={{textAlign: 'center'}}>Connexion</h1>
                { error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control
                            className='rounded'
                            type='email'
                            placeholder='enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}>
                        </Form.Control>
                    </Form.Group>   
                    <Form.Group controlId='password'>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                style={{outlineWidth:'0'}}
                                className='rounded'
                                type='password'
                                placeholder='************'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}>
                            </Form.Control>                  
                    </Form.Group>
                    <Button 
                    style={{letterSpacing:'5px'}}
                    type="submit" 
                    variant='primary' 
                    className='search__button'>
                        Se connecter
                    </Button>
                </Form>
               <Row className='py-3'>
                   <Col>
                    Vous n'avez pas un compte ? &nbsp;
                     <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>
                        Inscrivez-vous
                     </Link>
                   </Col>
               </Row>
            </FormContainer>
    )
}

export default LoginScreen
