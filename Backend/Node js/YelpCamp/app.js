var express = require("express"),
    app = express(),
    body_parser = require("body-parser"),
    mongoose = require("mongoose");

app.use(body_parser.urlencoded({extended: false}));
app.set("view engine","ejs");

// Database connection code
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to database!!");
});

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Yosemite National Park, California",
//     image:"https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     description: "This is a campground with beauty of heaven",
// }, (err , campground)=> {
//     console.log(campground);
// })

// var campgrounds = [
//     {name:"Yosemite National Park, California", image:"https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Shenandoah National Park, Virginia", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Boya Lake Provincial Park, Canada", image:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Yosemite National Park, California", image:"https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Shenandoah National Park, Virginia", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Boya Lake Provincial Park, Canada", image:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Yosemite National Park, California", image:"https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Shenandoah National Park, Virginia", image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Boya Lake Provincial Park, Canada", image:"https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
// ];

app.get("/", (req, res)=> {
    console.log("GET /");
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    console.log("GET /campgrounds");
    Campground.find({},(err, campgrounds)=>{
        if(!err)
            res.render("campgrounds", {campgrounds: campgrounds});
        else 
            console.log("Error in /campgrounds " + err);
    });
});

app.post("/campgrounds" ,(req, res) => {
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

app.get("/campgrounds/new", (req, res) => {
    console.log("GET /campgrounds/new");
    res.render("newCampground");
});

app.get("/campgrounds/:id", (req, res)=> {
    console.log(`GET /campgrounds/${req.params.id}`);
    Campground.findById(req.params.id, (err, campground)=>{
        if(err) {
            console.log("Opps! Error");
        } else {
            res.render("show", {campground: campground});
        }
    });
});

app.listen(3000, ()=> {
    console.log("Server started at port 3000");
});