var express        = require("express"),
    app            = express(),
    body_parser    = require("body-parser"),
    mongoose       = require("mongoose"),
    User           = require("./models/user"),
    seedDB         = require("./seed"),
    passport       = require("passport"),
    passportLocal  = require("passport-local"),
    methodOverride = require("method-override"),
    campgroundRoute= require("./routes/campgrounds"),
    commentsRoute  = require("./routes/comments"),
    authRoute      = require("./routes/auth"); 


app.use(express.static(__dirname +"/public"));
app.use(body_parser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(require("express-session")({
    secret:"thisisme",
    resave:false,
    saveUninitialized: false
}));
passport.use(new passportLocal.Strategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});
app.use(methodOverride('_method'));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database connection code
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to database!!");
});

// seedDB(); // Seed the database

app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments",commentsRoute);
app.use("/",authRoute);

app.listen(3000, ()=> {
    console.log("Server started at port 3000");
});