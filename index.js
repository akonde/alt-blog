const express = require('express');
// const passport = require('passport');
const AuthRouter = require('./routes/AuthRoutes');
const BlogRouter = require('./routes/BlogRoutes');

const app = express()

// register passport
// require("./passport") 

// middleware
app.use(express.json());
// app.use(BasicAuth)

// routes
app.use('/',  AuthRouter)
app.use('/',  BlogRouter)

// home route
app.get('/', (req, res) => {
    return res.json({ status: true, message: "Welcome to the blogging API" });
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

module.exports = app;
