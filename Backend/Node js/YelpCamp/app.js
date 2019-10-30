var express        = require("express"),
    app            = express(),
    body_parser    = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seed"),
    passport       = require("passport"),
    passportLocal  = require("passport-local");




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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database connection code
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to database!!");
});
seedDB();


app.get("/", (req, res)=> {
    console.log("GET /");
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    console.log("GET /campgrounds");
    Campground.find({},(err, campgrounds)=>{
        if(!err)
            res.render("campgrounds/campgrounds", {campgrounds: campgrounds});
        else 
            console.log("Error in /campgrounds " + err);
    });
});

app.post("/campgrounds",isLoggedIn ,(req, res) => {
    console.log("POST /campgrounds");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {name : name , image : image, description: desc};
    Campground.create(newCampground, (err, campground)=> {
        if(err) {
            console.log("Error in /campgrounds POST request");
        } else 
            res.redirect("/campgrounds");
    });
});

app.get("/campgrounds/new",isLoggedIn, (req, res) => {
    console.log("GET /campgrounds/new");
    res.render("campgrounds/newCampground");
});

app.get("/campgrounds/:id", (req, res)=> {
    console.log(`GET /campgrounds/${req.params.id}`);
    Campground.findById(req.params.id).populate("comments").exec((err, campground)=>{
        if(err) {
            console.log("Opps! Error" + err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

app.get("/campgrounds/:id/comments/new" , isLoggedIn,(req, res)=>{
    console.log(`GET /campground/${req.params.id}/comments/new`);
    Campground.findById(req.params.id, (err,campground)=>{
        if(err) {
            console.log("error "+err);
        } else {
            res.render("comments/newComment", {campground: campground});
        }
    });
}); 

app.post("/campgrounds/:id/comments", isLoggedIn ,(req, res)=>{
    console.log(`POST /campground/${req.params.id}/comments`);
    Campground.findById(req.params.id, (err, campground)=>{
        if(err) {
            console.log("Error "+err);
        } else {
            // console.log(req.body.comment);
            Comment.create(req.body.comment, (err, comment)=>{
                if(err) {
                    console.log("Error "+err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
});

app.get("/register", (req, res)=>{
    console.log("GET /register");
    res.render("register");
});

app.post("/register",(req,res)=>{
    User.register({username:req.body.username}, req.body.password, (err, user)=>{
        if(err) {
            console.log("Error "+err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/");
            });
        }
    });
});

app.get("/login", (req, res)=>{
    console.log("GET /login")
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/"
}) ,(req,res)=>{
    console.log("POST /login");
});

app.get("/logout" , (req,res)=>{
    console.log("GET /logout");
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req,res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, ()=> {
    console.log("Server started at port 3000");
});