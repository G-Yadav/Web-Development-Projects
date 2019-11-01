var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment = require("../models/comment");

router.get("/new" , isLoggedIn,(req, res)=>{
    console.log(`GET /campground/${req.params.id}/comments/new`);
    Campground.findById(req.params.id, (err,campground)=>{
        if(err) {
            console.log("error "+err);
        } else {
            res.render("comments/newComment", {campground: campground});
        }
    });
}); 

router.post("/", isLoggedIn ,(req, res)=>{
    console.log(`POST /campground/${req.params.id}/comments`);
    Campground.findById(req.params.id, (err, campground)=>{
        if(err) {
            console.log("Error "+err);
        } else {
            // console.log(req.body.comment);
            var Comm = {
                text: req.body.comment,
                author: {
                    id : req.user._id,
                    username : req.user.username
                }
            }
            Comment.create(Comm , (err, comment)=>{
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
    
function isLoggedIn(req,res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;