const express = require('express');
const { create } = require('lodash');

const app = express();

// view engines
app.set('view engine', 'ejs');
//listening for requests
app.listen(3000);

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