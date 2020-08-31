const express = require('express')
const morgan = require('morgan') //logger
const helmet = require('helmet')// hide header infos 
const cors = require('cors')
const mongoose = require('mongoose')

const tracks = require('./api/tracks')
require('dotenv').config();

const errorHandling = require('./errorHandling');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  

const app =  express();
app.use(morgan('common'));
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Travel tracker Backend server'
    })
})

app.use('/api/tracks', tracks);

app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler); 

const port = process.env.PORT || 1337;

app.listen(port, ()=> {
    console.log(`Goto http://localhost:${port}`);
})