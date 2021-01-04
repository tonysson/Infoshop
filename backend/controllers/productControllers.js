import Product from './../models/productModel.js';
import  asyncHandler  from 'express-async-handler';



/**
 * @description Get all products
 * @note req.query is the way we can get a string in the url after a question mark
 * @route GET /api/products?keyword
 * @access Public
 */
const getProducts = asyncHandler (async(req , res) => {

    // pagination
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    // allow us to search for a product based on it name
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    } : {}

    // get the count of our product
    const count = await Product.countDocuments({...keyword})
    //get our products based on the limit and skip
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
     res.json({products , page , pages: Math.ceil(count/pageSize)})
    
})

/**
 * @description Get a single product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


/**
 * @description Create a product
 * @route POST /api/products
 * @access Private/ admin
 */
const createProduct = asyncHandler(async (req, res) => {

    // create a dammy product
    const product = new Product({
        name:'Exemple de nom',
        price:0,
        user:req.user._id,
        image:'/images/example.jpg',
        brand:'Exemple de marque',
        category: 'Exemple de category',
        countInStock: 0,
        numReviews: 0,
        description: 'Exemple de description'
    })

    //save the product
    const createdProduct = await product.save()

    //send response
    res.status(201).json(createdProduct)
})


/**
 * @description Update a product
 * @route PUT /api/products/:id
 * @access Private/ admin
 */
const updateProduct = asyncHandler(async (req, res) => {

    const {name , price , description , image , brand , countInStock , category } = req.body

    // get the product to update
    const product = await Product.findById(req.params.id)

    if(product){

        // update the product 
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock
        product.brand = brand || product.brand
        product.image = image || product.image
      

        //save the product
    const updatedProduct = await product.save()

    //send response
    res.json(updatedProduct)

    }else{
        res.status(404)
        throw new Error('Product Not found')
    }    
})




/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access Private/ admin
 */
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({messae: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

/**
 * @description Create  reviews on a specific product
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {

    const {rating , comment } = req.body

    // get the product to make reviews on by id
    const product = await Product.findById(req.params.id)

    if(product){

       // check if the user has already reviews  on the product
       const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        //send error if yes
       if(alreadyReviewed){
           res.status(400)
           throw new Error('Vous avez déja donné votre avis')
       }

       //if not we build our review object
       const review ={
            name:req.user.name,
            rating :Number(rating),
            comment,
            user: req.user._id
       }


      //save the product with the reviews , numReviews and rating

      //push the new review in the reviews array
      product.reviews.push(review)
      // update the numReviews
      product.numReviews = product.reviews.length 
      // calculate the rating 
      product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length

      //save the product with all those changes
      await product.save()
      res.status(201).json({message:'Review added'})
    }else{
        res.status(404)
        throw new Error('Product Not found')
    }    
})


/**
 * @description Get top rated products
 * @route GET /api/products/top
 * @access Public
 */
const getTopProducts = asyncHandler( async(req, res) => {

    const products = await Product.find({}).sort({rating: -1}).limit(4)

    if(products){
        res.json(products)
    }else{
        restart.status(404)
        throw new Error('No products found')
    }
})



export {getProducts , getProductById , deleteProduct, createProduct , updateProduct, createProductReview , getTopProducts}