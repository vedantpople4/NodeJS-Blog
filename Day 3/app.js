const express = require('express');
const { create, result } = require('lodash');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const { render } = require('ejs');

const app = express();

//chnage username/password string
const dbURI = 'mongodb+srv://<uname/pass>@node.xrgibh4.mongodb.net/node?retryWrites=true&w=majority'
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

//blog routes
app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/blogs/create', (req,res)=>{
    res.render('create', { title : 'Create'});
})

app.get('/blogs/:id', (req,res)=>{
    let id = req.params.id;
    //console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details'});
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err)
        });
});

//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title : 'Error'});
});  