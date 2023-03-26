const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()
const URI = process.env.COMPASS_URI
const port = process.env.PORT || 3000
const startServer = async() =>{
    try{
        await mongoose.connect(URI)
        console.log('Connected to MongoDB server successfully')
    }
    catch(err){
        console.error({message: err.message})
    }
}
module.exports = startServer



