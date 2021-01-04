import mongoose from 'mongoose';
import  bcrypt  from 'bcryptjs';

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email: {
        type: String,
        required: true,
        unique:true
    },

    password: {
        type : String,
        required:true
    },

    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
}, {
    timestamps : true
})


/**
 *@description allow us to compare the plain text password entered to the enCrypted one in database
 * @param {plainText password} enteredPassword 
 */
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

/**
 * @description allow us to Encrypt the user password before saving the user in database
 * @param {next} next
 */
userSchema.pre('save' , async function(next){
    //on s'assure que lorqu'on modifie tout sauf le password on n'encrypt pas le password
    if(!this.isModified('password')){
        next()
    }
    // on encrypte le password sinon
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
})

const User = mongoose.model('User', userSchema)

export default User