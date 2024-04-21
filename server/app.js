const express = require("express");
const dotenv = require('dotenv').config();
const path = require("path");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const expressSession = require("express-session");
// const flash = require('connect-flash');
const { validationResult, body, check } = require('express-validator');
const passport = require('passport');
const router = require('./routes/index.js');
const User = require("./models/users.js");

//app and DB settings

//DB settings

mongoose
    .connect("mongodb://127.0.0.1:27017/FAMChatDB")
    .then(() => console.log("Connected to db"))
    .catch((error) => console.log(error.message));

//app settings

const app = express();
app.use(
    expressSession({
        cookie: { name: 'user', maxAge: 5000000 },
        resave: false,
        saveUninitialized: false,
        secret: '6586a699675d607d2158abd3',
    })
);
app.set("token", process.env.TOKEN || "tOkEnFoRaPi0")
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// app.use(
//     // methodOverride("_method", {
//         methods: ["POST", "GET"],
//     })
// );

app.use(passport.initialize());
app.use(passport.session());

// Use PassportLocalMongoose's createStrategy instead of LocalStrategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//server port
app.set('port', process.env.PORT || 5000);

//routes
app.use((req, res, next) => {
    
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next()
});

app.use("/", router);
//server connection

const server = app.listen(app.get('port'), (err) => {
    err ? console.log('this', err) : console.log("server listening at port " + app.get('port'));
}), io = require('socket.io')(server);
// require('./controllers/chatController')(io);