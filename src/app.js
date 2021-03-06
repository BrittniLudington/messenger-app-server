require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const parser = require('body-parser');
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.options('*',cors());

app.use(function(req,res,next)
{
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(helmet());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }))

app.use(userRoutes);
app.use(messageRoutes);

app.get('/', (req,res) =>
{
    res.status(200).send('Welcome to the app of the private messaging server! For information on endpoints please view the read me at the github repository:https://github.com/BrittniLudington/messenger-app-server');
})

app.use(function errorHandler(error,req,res,next)
{
    let response;
    if(NODE_ENV === 'production')
    {
        response = {error: {message: 'server error'}}
    }
    else
    {
        console.error(error);
        response = {message: error.message, error};
    }
    res.status(500).json(response);
})

module.exports = app;
