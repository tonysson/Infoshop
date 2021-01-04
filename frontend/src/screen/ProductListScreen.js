import React, {useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table , Row , Button , Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {IconButton } from '@material-ui/core';
import { listProducts , deleteProduct , createProduct } from './../actions/productActions';
import { PRODUCT_CREATE_RESET } from './../constants/productConstants';
import Paginate from './../components/Paginate';





const ProductListScreen = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1 

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const userLogin = useSelector(state => state.userLogin)
    const productDelete = useSelector(state => state.productDelete)
    const productCreate = useSelector(state => state.productCreate)
    const {success: successDelete , error: errorDelete , loading: loadingDelete} = productDelete
    const { success: successCreate, error: errorCreate , loading: loadingCreate , product:createdProduct} = productCreate
    const {loading , error , products, pages , page} = productList
    const {userInfo} = userLogin
    
    useEffect(() => {
        
        dispatch({type: PRODUCT_CREATE_RESET})

        if(userInfo && !userInfo.isAdmin){
            history.push('/login')
        }
       
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }

    },[dispatch , history, userInfo , successDelete  , successCreate, createdProduct , pageNumber ])


    // deletetHandler
    const deleteHandler = (id) => {
        if(window.confirm('Etes-vous sûrs?')){
         dispatch(deleteProduct(id))
        }
    }

    //create product handler
    const createProductHandler = () => {
        dispatch(createProduct())

    }

    return (
        
         <>
          <Row className='align-items-center'>
            <Col>
                <h4 style={{fontSize:'2rem' , color:'black'}}>
                 LES ARTICLES
                </h4>
            </Col>
            <Col className="text-right">
                <Button className='product_button my-3 rounded' onClick={createProductHandler} >
                  <AddIcon/> CREER UN ARTICLE
                </Button>
            </Col>
          </Row>

          {loadingDelete && <Loader/>}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loadingCreate && <Loader/>}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            
            {
                loading ? <Loader/> : error ? (
                     <Message variant='danger'>
                         {error}
                     </Message>
                ) : (
                    <>
                    <Table striped bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th >NAME</th>
                                <th >PRICE</th>
                                <th >CATEGORY</th>
                                <th >BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map(product => (
                                <tr key={product._id}>
                                    <td style={{color:'#b71540'}}>
                                        {product._id}
                                    </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}}>
                                        {product.name}
                                    </td>
                                     <td style={{color:'#182C61', fontWeight:'bold'}} >
                                        {product.price} €
                                    </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}} >
                                       {product.category}
                                    </td>
                                    <td style={{color:'#182C61', fontWeight:'bold'}}>
                                        {product.brand}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                        </LinkContainer>
                                        <IconButton 
                                        onClick={
                                            (e) => {
                                                 e.preventDefault()
                                                 deleteHandler(product._id)
                                            }
                                        }>
                                            <DeleteIcon style={{ color: 'red' }} />
                                        </IconButton>
                                    </td>
                                 
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin ={true} />
                    </>
                )
            }
        </>
    )
}

export default ProductListScreen
