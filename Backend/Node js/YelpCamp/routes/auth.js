var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    passportLocal = require("passport-local");

router.get("/", (req, res)=> {
    console.log("GET /");
    res.render("landing");
});

router.get("/register", (req, res)=>{
    console.log("GET /register");
    res.render("register");
});

router.post("/register",(req,res)=>{
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

router.get("/login", (req, res)=>{
    console.log("GET /login")
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/"
}) ,(req,res)=>{
    console.log("POST /login");
});

router.get("/logout" , (req,res)=>{
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

module.exports = router;
    