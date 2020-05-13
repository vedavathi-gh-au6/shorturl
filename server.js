var express = require("express");
var hbs = require("hbs");
var path = require("path");
var methodOverride = require("method-override");
var session = require("express-session");
require("./utils/hbs");
const dotenv=require('dotenv')
dotenv.config();
require("./db");
Urls=require("./models/Urls")
var PORT = process.env.PORT || 8000;
// Routes of both API as well as normal
var urlAPIRoutes = require("./routes/apiRoutes/urlApiRoutes");
var userAPIRoutes = require("./routes/apiRoutes/userApiRoutes");
var urlNormalRoutes = require("./routes/normalRoutes/urlNormalRoutes");
var userNormalRoutes = require("./routes/normalRoutes/userNormalRoutes");

// Init
var app = express();

// Setting HBS as template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "layout" });

// Registering hbs partials
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Having user form body parsed
app.use(express.urlencoded({ extended: false }));

// Adding custom request type override query key name
app.use(methodOverride("cadbury"));

// Adding the session capabilities
app.use(
  session({
    secret: "shortUrlsSecretKey",
    resave: false,
    name: "shortUrlSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

app.use(userNormalRoutes);
app.use(urlNormalRoutes);
app.use(userAPIRoutes);
app.use(urlAPIRoutes);

app.get("/", function(req, res) {
  return res.render("index", {
    title: "Home page",
    userId: req.session.userId
  });
});


app.get("/:urlId",async(req,res)=>{
   const url=await Urls.findOne({shorturl:req.params.urlId})
   if(url==null) return res.sendStatus(404)
   url.count++
   url.save()
   res.redirect(url.longurl)
}
)

app.listen(PORT, function() {
  console.log("Server started on port" + PORT); 
});
