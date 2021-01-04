import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';
import  asyncHandler  from 'express-async-handler';

/**
 * @description Allow us to know if a user is authenticated
 * we can also use the package express-jwt to manage it
 */

const protect = asyncHandler(async (req, res, next) => {

    let token

    // console.log(req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       
        try {
            //get the token
            token = req.headers.authorization.split(' ')[1]
            // decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            //console.log(decoded);

            // IMPORTANT: fetch the user without his password and set it into req.user 
            req.user = await User.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not authorized , token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized , no token')
    }
   
})

/**
 * @description allow us to know if an user is admin or not
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */

const isAdmin = (req, res, next) => {

    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

 export {protect , isAdmin}
