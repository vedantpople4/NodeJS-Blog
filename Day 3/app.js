const express = require('express');
const { create, result } = require('lodash');
const morgan = require('morgan')
const mongoose = require('mongoose')
//const Blog = require('./models/blog');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes'); 

const app = express();

//chnage username/password string
const dbURI = 'mongodb+srv://<username>:<password>@node.xrgibh4.mongodb.net/node?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> console.log('CONNECTED to Db'))
    .catch((err) => console.log(err));
//mongoose.set(strictQuery, true);

// view engines
app.set('view engine', 'ejs');
//listening for requests
app.listen(3000);

//middleware static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));



// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

app.use((req, res, next) => {
    console.log('');
    next();
});

app.get('/', (req,res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req,res)=>{
    res.render('about', { title : 'About'});
});

app.use('/blogs', blogRoutes)

//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title : 'Error'});
});  
