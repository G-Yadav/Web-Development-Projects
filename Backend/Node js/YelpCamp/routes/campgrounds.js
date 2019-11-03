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


router.put("/:id", (req, res)=>{
    console.log(`PUT /campgrounds/${req.params.id}`);
    Campground.findByIdAndUpdate(req.params.id, req.body.camp , (err , UpdatedCampground)=> {
        if(err) {
            console.log("Oops! Error " + err);
            res.redirect("/campgrounds");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
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


router.get("/:id/edit", (req , res)=> {
    console.log(`GET /campgrounds/${req.params.id}/edit`);
    Campground.findById(req.params.id, (err , foundCampground)=> {
        if(err) {
            console.log("Oops! Error" + err);
        } else {
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    });
}); 

router.delete("/:id" , (req, res)=> {
    console.log(`Delete /campgrounds/${req.params.id}`);
    Campground.findByIdAndDelete(req.params.id, (err, DeletedCampground)=> {
        if(err) {
            console.log("Oops! Error " + err);
        } else {
            res.redirect("/campgrounds");
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
    