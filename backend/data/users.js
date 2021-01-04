import bcrypt from 'bcryptjs';

const users = [

    {
        name:"aellah admin",
        email:"aellah@gmail.com",
        password: bcrypt.hashSync('test1234', 10),
        isAdmin:true
    },

    {
        name: "teyi laws",
        email: "teyi@gmail.com",
        password: bcrypt.hashSync('test1234', 10)
    },

    {
        name: "tony kante",
        email: "tony@gmail.com",
        password: bcrypt.hashSync('test1234', 10)
    },

    {
        name: "momo edeh",
        email: "momo@gmail.com",
        password: bcrypt.hashSync('test1234', 10)
    }
]

export default users ;