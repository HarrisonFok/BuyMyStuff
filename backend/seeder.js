import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import questions from "./data/questions.js"
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Question from "./models/questionModel.js"
import connectDB from './config/db.js';

dotenv.config();

connectDB();

// Asynchronous because we're dealing with mongoose (i.e. the database)
const importData = async () => {
    try {
        // Clear the db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Question.deleteMany();

        const createdUsers = await User.insertMany(users);
        // connection betwen products and users
        // want admin to be the userId for all products
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(p => {
            return {...p, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        // Adding sample questions to Jane
        const sampleQuestions = questions.map(q => {
            return {...q, user: createdUsers[2]}
        })

        await Question.insertMany(sampleQuestions)

        console.log("Data imported".green.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        // Clear the db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed".red.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
}

// -d to destroy data 
// process.argv[2] is whatever passed in
if(process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
} 