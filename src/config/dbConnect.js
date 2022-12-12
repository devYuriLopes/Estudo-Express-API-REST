import mongoose from "mongoose";

mongoose.connect("mongodb+srv://BookStore:123@bookstore.b9i8sfw.mongodb.net/BookStore");

let db = mongoose.connection;

export default db; 