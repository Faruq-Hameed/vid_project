const express = require('express');
const mongoose = require('mongoose')

const app = express()
const URI = process.env.COMPASS_URI
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



