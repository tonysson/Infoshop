import React from 'react';
import {Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const CheckoutSteps = ({step1, step2 ,step3 , step4}) => {
    return (
        <Nav className="justify-content-center mb-5">
            <Nav.Item>
                {
                    step1? (
                        
                          <Nav.Link disabled>
                        <VerifiedUserIcon style={{color:'green'}}/> Connecté
                          </Nav.Link>
                        
                    ):(
                        <LinkContainer to='/login'>
                        <Nav.Link >
                         <VerifiedUserIcon/> Se Connecter
                        </Nav.Link>
                        </LinkContainer>
                        
                    )}
            </Nav.Item>
            <Nav.Item>
                {
                    step2? (
                         <Nav.Link disabled>
                        <LocalShippingIcon style={{color:'green'}} /> Livraison
                        </Nav.Link>
                    ):(
                        <LinkContainer to='/shipping'>
                          <Nav.Link>
                           <LocalShippingIcon/>   Livraison
                          </Nav.Link>
                        </LinkContainer>
                    )}
            </Nav.Item>
            <Nav.Item>
                {
                    step3? (
                        <Nav.Link disabled>
                        <CreditCardIcon style={{color:'green'}} /> Payement
                        </Nav.Link>
                    ):(
                        <LinkContainer to='/payement'>
                          <Nav.Link>
                            <CreditCardIcon/> Payement
                          </Nav.Link>
                        </LinkContainer>
                    )}
            </Nav.Item>
            <Nav.Item>
                {
                    step4? (
                        <LinkContainer to='/placeorder'>
                          <Nav.Link>
                       <i style={{color:'green'}}  className="fa fa-paper-plane" aria-hidden="true"></i> Commander
                          </Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>
                       <i className="fa fa-paper-plane" aria-hidden="true"></i> Commander
                       </Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
