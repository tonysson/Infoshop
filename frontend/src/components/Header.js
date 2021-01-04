import React from 'react';
import { Container , Navbar , Nav , NavDropdown  } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { Route } from 'react-router-dom';
import {FaCartPlus} from 'react-icons/fa';


const Header = () => {

    //to do an actio we use useDispatch
    const dispatch = useDispatch()

     //get our state by using useSelector
     const cart = useSelector(state => state.cart)
     const {cartItems} = cart

    // to get access to the redux state we use useSelector
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                   <LinkContainer to="/">
                        <Navbar.Brand className='web_title'>InfoShop</Navbar.Brand>
                   </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({history}) => <SearchBox history={history} />}/>
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link  >
                                {/* <AddShoppingCartIcon style={{color : ' white'  , fontSize:'1.5rem'}}/> CART */}
                                 <FaCartPlus className="nav-icon__cart"></FaCartPlus>
                               <sup>
                                {
                                    cartItems && cartItems.length === 0 ?
                                          (
                                              <small className="cart-badge" >
                                              0
                                             </small> 
                                          ) :
                                          
                                        (
                                            <small className="cart-badge">
                                             {cartItems.reduce((acc , item) => acc + item.qty , 0)}  
                                           </small>
                                        )
                                }
                               
                              </sup>
                            </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown style={{marginTop: '2px'}} title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                      <NavDropdown.Item  >
                                          <h6 style={{fontSize: '0.8rem' }}>
                                              PROFILE
                                          </h6>
                                      </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i style={{ color:'#b71540' , fontSize:'1.4rem'}} className="fa fa-power-off" aria-hidden="true"></i>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ): (
                            <LinkContainer to = "/login">
                                <Nav.Link >
                                    <i className="fas fa-user"></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                            )}
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                      <NavDropdown.Item  >
                                          <h6 style={{fontSize: '0.8rem' }}>
                                              USERS
                                          </h6>
                                      </NavDropdown.Item>
                                    </LinkContainer>
                                     <LinkContainer to='/admin/productlist'>
                                      <NavDropdown.Item  >
                                          <h6 style={{fontSize: '0.8rem' }}>
                                              PRODUCTS
                                          </h6>
                                      </NavDropdown.Item>
                                    </LinkContainer>
                                     <LinkContainer to='/admin/orderlist'>
                                      <NavDropdown.Item  >
                                          <h6 style={{fontSize: '0.8rem' }}>
                                              ORDERS
                                          </h6>
                                      </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
        </header>
    )
}

export default Header
