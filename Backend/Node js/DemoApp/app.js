var express = require("express");
var app = express();
var body_parser = require("body-parser");

app.use(body_parser.urlencoded({extended : false}));
app.set("view engine" , "ejs");

var friends = ["sahil", "amam", "gaurav", "manish", "saurav" ];

app.get("/", function(req, res) {
    console.log("GET /");
    res.render("home");
});

app.get("/friends", function(req, res) {
    console.log("GET /friends");
    res.render("friends", {friends : friends});
});

app.post("/addFriend" , function(req, res) {
    console.log("GET /addFriend");
    friends.push(req.body.name);
    res.redirect    ("friends");
});


app.listen(3000, function() {
    console.log("App server started listening on port: 3000");
});

