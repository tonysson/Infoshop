import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB() ;

//IMPORT DATA
const importData = async () => {

    try {

        //we clean everything in the database before inserting
      await  Order.deleteMany()
      await  User.deleteMany()
      await  Product.deleteMany()

      //on stocke ts les users ds createdUser because we want to access admin in the first array
     const createdUsers = await User.insertMany(users)

     // the first user create in users folder is the admin one that is why we do createdUsers[0]
     const adminUser = createdUsers[0]._id

     //  we add admin on every product
     const sampleProducts = products.map(product => {
         return {...product, user: adminUser}
     })

     // we export the product
     await Product.insertMany(sampleProducts)

     console.log('imported data'.magenta.bold);
     process.exit()
    } catch (error) {
        console.error(`${error.message}`.red.inverse)
        // exit the process with failure
        process.exit(1)
    }
}


//DESTROY DATA
const destroyData = async () => {

    try {
        //we clean everything in the database before inserting
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        console.log('Destroyed data'.red.bold);
        process.exit()
    } catch (error) {
        console.error(`${error.message}`.red.inverse)
        // exit the process with failure
        process.exit(1)
    }
}

// we want to do smthing like this in the console node backend/seeders -d to destroy data , SO ;
if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}

