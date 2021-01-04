import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';




const  App = () =>  {
  return (
   
    <Router>
       <Header/>
       <main className="py-3">
        <Container>
        <Route exact path='/login' component={LoginScreen}/>
        <Route exact path='/register' component={RegisterScreen} />
        <Route exact path='/profile' component={ProfileScreen} />
        <Route exact path='/shipping' component={ShippingScreen} />
        <Route exact path='/payement' component={PaymentScreen} />
        <Route exact path='/placeorder' component={PlaceOrderScreen} />
        <Route exact path='/admin/userlist' component={UserListScreen} />
        <Route exact path='/admin/productlist' component={ProductListScreen} />
        <Route exact path='/admin/productlist/:pageNumber' component={ProductListScreen} />
        <Route exact path='/admin/orderlist' component={OrderListScreen} />
        <Route exact path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route exact path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route exact path="/product/:id" component={ProductScreen}  />
        <Route exact path="/order/:id" component={OrderScreen}  />
        <Route exact path="/cart/:id?" component={CartScreen} />
        <Route exact path="/search/:keyword" component={HomeScreen} />
        <Route exact path="/page/:pageNumber" component={HomeScreen} />
        <Route exact path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
        <Route exact path="/" component={HomeScreen} />
        </Container>
       </main>
       <Footer/>
    </Router>
  );
}

export default App;
