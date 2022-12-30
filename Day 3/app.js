const express = require('express');
//const { create } = require('lodash');
const morgan = require('morgan')

const app = express();

// view engines
app.set('view engine', 'ejs');
//listening for requests
app.listen(3000);

//middleware static files

app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('In the next Middleware');
    next();
});

app.get('/', (req,res)=>{
    const blogs = [
        {title : 'RedBull', snippet: 'Redbull is F1 team'},
        {title : 'Mercedes', snippet: 'Mercedes is F1 team'},
        {title : 'Ferrari', snippet: 'Ferrari is F1 team'},
    ];
   // res.send('<p>This is it</p>')
   res.render('index', { title : 'Home', blogs});
});

app.get('/about', (req,res)=>{
    res.render('about', { title : 'About'});
});

//redirects
app.get('/blogs/create', (req,res)=>{
    res.render('create', { title : 'Create'});
})

//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title : 'Error'});
});  