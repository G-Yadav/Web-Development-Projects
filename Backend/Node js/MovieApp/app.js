var express = require("express");
var app = express();
var rq = require("request-promise");
var body_parser = require("body-parser");

app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    console.log("GET /");
    res.render("home");
});

app.get("/results", (req, res) =>{
    console.log(`GET /results keyword=${req.query.name}`);
    rq(`http://www.omdbapi.com/?apikey=[apikey]&s=${req.query.name}`)  // enter your api key from omdb api  
        .then((body)=> {
            var parsedData = JSON.parse(body);
            res.render("result", {data: parsedData});
        })
        .catch((err)=> {
            console.log("Error! "+ err);
        });
}); 

app.listen(3000, ()=>{
    console.log("Movie server is running on port 3000");
});