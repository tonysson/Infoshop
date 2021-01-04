import Order from './../models/orderModel.js';
import  asyncHandler  from 'express-async-handler';

 
/**
 * @description Create new Order
 * @route POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler ( async (req, res) => {

    // all the items to add
    const {
         orderItems, 
         shippingAddress, 
         paymentMethod, 
         shippingPrice, 
         totalPrice, 
         taxPrice,
         itemsPrice , 
    } = req.body

    // we verify if there is products in the orderItems || not
    if(orderItems && orderItems.length === 0){
        res.status(404)
        throw new Error('No order Items')

    }else{

        // if orderItems we create the new order
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod,
            shippingPrice, 
            totalPrice,
            taxPrice, 
            itemsPrice
        })

        // save the new order
        const createdOrder = await order.save()
        //send a response
        res.status(201).json(createdOrder)
    }
})


/**
 * @description allow us to get an order by it id
 * @route GET /api/orders/:id
 * @access Private
 */

const  getOrderById = asyncHandler ( async(req, res) => {

    // get the id of the order
    const order = await Order.findById(req.params.id).populate('user','name email')

    //if it exists send response or send error message
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

});


/**
 * @description allow us to update an order to paid (essentially some info in DB)
 * @route PUT /api/orders/:id/pay
 * @access Private
 */

const  updateOrderToPaid = asyncHandler ( async(req, res) => {
    // get the id of the order 
    const order = await Order.findById(req.params.id)

    if(order){

        //Update those fields
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }

        //save the new order
        const updateOrder = await order.save()

        //send a response
        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

});


/**
 * @description all us to get logged in user Order
 * @route GET /api/orders/myorders
 * @access Private
 */

const  getMyOrders = asyncHandler ( async(req, res) => {

    // get oorders that belong to the logged In user
    const orders = await Order.find({user:req.user._id})

    //if it exists send response or send error message
    if(orders){
        res.json(orders)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

});

/**
 * @description get all orders
 * @route GET /api/orders
 * @access Private/admin only
 */

const  getOrders = asyncHandler ( async(req, res) => {

    
    // get oorders that belong to the logged In user
    const orders = await Order.find({}).populate('user', 'id name')

    //if it exists send response or send error message
    if(orders){
        res.json(orders)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

});



/**
 * @description all us to update an order to delivered (essentially some info in DB)
 * @route PUT /api/orders/:id/deliver
 * @access Private/ admin only
 */

const  updateOrderToDelivered = asyncHandler ( async(req, res) => {
    // get the id of the order 
    const order = await Order.findById(req.params.id)

    if(order){

        //Update those fields
        order.isDelivered = true
        order.deliveredAt = Date.now()
       
        //save the new order
        const updateOrder = await order.save()

        //send a response
        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }

});




export {addOrderItems , getOrderById , updateOrderToPaid, getMyOrders , getOrders , updateOrderToDelivered}

