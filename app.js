//git check
if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const Joi = require('joi');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const reviewRoutes = require('./routes/reviews');
const MongoStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://localhost:27017/gameblog'
//'mongodb://localhost:27017/gameblog'
//process.env.DB_URL

//the 3 below are deprecated.

mongoose.connect(dbUrl, {
    /*     useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false */
    });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

const store = new MongoStore({
    url: dbUrl,
    secret: 'thisIsMySecret',
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
});

const sessionConfig = {
    store,
    secret: 'thisIsMySecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
    }
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.tinyMCEApiKey = process.env.TINY_MCE_API;
    next();
});


app.use('/', userRoutes)
app.use('/articles', articleRoutes);
app.use('/articles/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('articles/home');
});

app.get('/ahahahhh', (req, res) => {
    res.render('newman');
});

app.get('/about', (req, res) => {
    res.render('articles/about');
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) =>{
    const { statusCode = 500} = err;
    if (!err.message) err.message = "Something Went Wrong";
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('serving on port 3000');
});