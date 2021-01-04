import mongoose from 'mongoose'

const connectDB = async () => {

    try {
        const connector = await mongoose.connect(process.env.MONGO_URL , {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        console.log(`Mongo Connected: ${connector.connection.host}`.yellow.bold);

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }

}

export default connectDB