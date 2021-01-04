import React , {useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { listTopProducts } from './../actions/productActions';
import { Link } from 'react-router-dom';
import {Carousel , Image} from 'react-bootstrap';
import Message from './Message';
import Rating from './Rating';





const ProductCarouselle = () => {

    const dispatch = useDispatch()
    const { error , products} = useSelector(state => state.productTopRated)

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

  return  error? <Message variant='danger'>{error}</Message> : (
      <Carousel pause='hover' className='bg-dark mt-4 mb-4'>
          {
              products && products.map((product) => (
                  <Carousel.Item key={product._id}>
                      <Link to={`/product/${product._id}`}>
                          <Image src={product.image} alt={product.name} fluid/>
                          <Carousel.Caption className='carousel-caption'>
                            <h6>
                                {product.name}
                            </h6>
                            <h5>
                                <Rating value={product.rating} />
                            </h5>
                          </Carousel.Caption>
                      </Link>
                  </Carousel.Item>
              ))
          }
      </Carousel>
  )
}

export default ProductCarouselle
