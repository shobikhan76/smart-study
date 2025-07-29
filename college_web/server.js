const express = require('express')
const app = require('./app')
const connectDB = require('./config/db');

// Connect to MongoDB first
connectDB();

app.listen(process.env.PORT , () =>{
    console.log('Server is running on port 5000')
})