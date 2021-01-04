import jwt from 'jsonwebtoken';

/**
 * @description generate a token
 * @param { id} userId
 */
const generateToken = (id) => {

    return jwt.sign({id} , process.env.JWT_SECRET_KEY , {
        expiresIn : '30d'
    })
}

export default generateToken ;