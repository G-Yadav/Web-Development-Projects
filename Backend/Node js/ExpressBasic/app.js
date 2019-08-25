var express = require("express");
var app = express();

app.get("/", function(req, res) {
    console.log("GET /");
    res.send("Hi there, welcome to the assignment!");
});

app.get("/speak/:animal" ,function(req, res) {
    console.log("GET /speak/"+req.params.animal);
    var animal = req.params.animal;
    if(animal === "pig") {
        res.send("oink");
    } else if(animal === "cow") {
        res.send("moo");
    } else if(animal == "dog") {
        res.send("whoof whoof!");
    } else {
        res.send("Unknown voice");
    }
});

app.get("/repeat/:text/:num", function(req, res) {
    var text = req.params.text;
    var num = parseInt(req.params.num);
    console.log("GET /repeat/"+text+"/"+num);
    var result = ""
    for(var i=0; i<num; i++) {
        result += text+" "
    }
    res.send(result);
});

app.get("*" , function(req, res) {
    console.log("GET 404");
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, function() {
    console.log("Server start at port 3000");
});