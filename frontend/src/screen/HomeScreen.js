import React , {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from './../components/Product';
import { listProducts } from './../actions/productActions';
import { useDispatch , useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from './../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarouselle from '../components/ProductCarouselle';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';





const HomeScreen = ({match}) => {

    //for search , that is the word we give to the path into app.js
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

     //call useDispatch
    const dispatch = useDispatch()
     //get our state by using useSelector
    const productList = useSelector(state => state.productList)
     //destructuring from productDetails
    const {loading , error , products , pages , page} = productList

    useEffect(() => {
        dispatch(listProducts(keyword , pageNumber))
    }, [dispatch , keyword , pageNumber])

    return (
        <>
            <Meta/>
            {!keyword ?   <ProductCarouselle/> : <Link to='/' className='btn btn-light rounded'>Go Back</Link>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                 <Fade bottom cascade={true}>
                  <Row>
                    {
                        products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))
                    }
                   </Row>
                   </Fade>
                   <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
                </>
            )}
            
        </>
    )
}

export default HomeScreen
