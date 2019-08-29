var express = require("express"),
    app     = express(),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    passportLocal = require("passport-local"),
    User = require("./models/user"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth_app_basic", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "thisisme",
    resave:false,
    saveUninitialized:false 
}));
passport.use(new passportLocal.Strategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req,res)=>{
    console.log("GET /");
    res.render("home.ejs");
});

app.get("/secret",isLoggedIn, (req,res)=>{
    console.log("GET /secret");
    res.render("secret");
});

app.get("/register", (req, res)=>{
    console.log("GET /register");
    res.render("signup");
    
});

app.post("/register", (req, res)=> {
    console.log("POST /register");
    User.register({username: req.body.username}, req.body.password,(err, user)=>{
        if(err) {
            console.log("Error " + err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/secret");
            }); 
        }
    });
});

app.get("/login", (req, res)=>{
    console.log("GET /login");
    res.render("login");
});

app.post("/login", passport.authenticate("local" , {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), (res, req)=>{
});

app.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

app.listen(3000, ()=>{
    console.log("Server started at port 3000");
});
