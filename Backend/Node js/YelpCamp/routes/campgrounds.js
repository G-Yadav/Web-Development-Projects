var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground");

router.get("/", (req, res) => {
    console.log("GET /campgrounds");
    Campground.find({},(err, campgrounds)=>{
        if(!err)
            res.render("campgrounds/campgrounds", {campgrounds: campgrounds});
        else 
            console.log("Error in /campgrounds " + err);
    });
});

router.post("/",isLoggedIn ,(req, res) => {
    console.log("POST /campgrounds");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {name : name , image : image, description: desc, author: {
        id: req.user._id,
        username : req.user.username
    }};
    Campground.create(newCampground, (err, campground)=> {
        if(err) {
            console.log("Error in /campgrounds POST request");
        } else 
            res.redirect("/campgrounds");
    });
});

router.get("/new",isLoggedIn, (req, res) => {
    console.log("GET /campgrounds/new");
    res.render("campgrounds/newCampground");
});

router.get("/:id", (req, res)=> {
    console.log(`GET /campgrounds/${req.params.id}`);
    Campground.findById(req.params.id).populate("comments").exec((err, campground)=>{
        if(err) {
            console.log("Opps! Error" + err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

function isLoggedIn(req,res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
    