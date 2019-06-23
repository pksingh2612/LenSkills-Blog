require('dotenv').config();

//console.log(process.env);
//Imported module
const express = require('express');
//template engine
const expressEdge = require('express-edge');
//database 
const mongoose = require('mongoose');

const bodyParser=require('body-parser');

const fileUpload = require('express-fileupload');

const expressSession = require('express-session');

const connectMongo =require('connect-mongo');

const connectFlash=require('connect-flash');

const edge =require('edge.js')

const cloudinary=require('cloudinary');

//Controller Module
const createPostController=require('./controllers/createPost')

const homePageController=require('./controllers/homePage')

const storePostController=require('./controllers/storePost')

const getPostController = require('./controllers/getPost')

const createUserController=require('./controllers/createUser')

const storeUserContoller = require('./controllers/storeUser')

const loginController=require('./controllers/login');

const loginUserController=require('./controllers/loginUser')

const logoutController=require('./controllers/logout')

//express use
const app= new express()

//Persistent express session
const mongoStore=connectMongo(expressSession);

//express session
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
        store: new mongoStore({
            mongooseConnection:mongoose.connection
        })
    }))

//Store post data into database    
mongoose.connect(
    process.env.DB_URI,{useNewUrlParser:true},
    function(error){
        if(error){
            console.log(error);
        }else{
            console.log("Connected to the database");
        }
    });

//Flash messaging
app.use(connectFlash());

//file upload to cloudinary
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
});

//image upload with express
app.use(fileUpload())

//static assets with express
app.use(express.static('public'))

app.use(expressEdge)

app.set('views', `${__dirname}/views`)

//conditionally display login and register links
app.use('*',(req,res,next)=>{
    edge.global('auth',req.session.userId)
next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Registering validation middleware

const storePost = require('./middleware/storePost')


//Authentication middleware

const auth =require('./middleware/auth');

const redirectIfAuthenticated = require('./middleware/redirectifAuthencticated')

//Displaying a list of posts
app.get('/', homePageController);

//User logout
app.get('/auth/logout',auth,logoutController);

//User login process

app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
//user registration
app.get('/auth/register', redirectIfAuthenticated, createUserController);

//user model
app.post('/users/register', redirectIfAuthenticated, storeUserContoller)
//create post form

app.get('/posts/new',auth,createPostController);

//express post requests
app.post('/posts/store',auth,storePost,storePostController);

app.get('/post/:id', getPostController);


app.use((req,res)=>res.render('not-found'));
app.listen(process.env.PORT,()=>{
    console.log(`App listening on port ${process.env.PORT}`);
})