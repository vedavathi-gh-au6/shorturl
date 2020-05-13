// API controller for Urls
shortId=require('shortid')
//console.log(shortId.generate());

var path = require("path");
// Absolute path for url.json
//var urlJSONPath = path.join(__dirname, "../", "../", "db", "url.json");
var Urls = require("../../models/Urls");

module.exports = {
  createUrl: function(req, res) {
    console.log("inside create url")
    // Create a url object
    var url = new Urls({ ...req.body });
    longurls=req.body.longurl
    console.log(longurls)
    var user = req.user;
    console.log(user)
    url.shorturl=shortId.generate()
    console.log(shortId.generate());
    
    // Wire the currently logged in user to the new url
    url.user = user._id;
    user.urls = [...user.urls, url._id];

    // Saving the new url into the user's url array
    user
      .save()
      .then(function(user) {
        console.log(user);
        console.log("User has successfully added the new url");
      })
      .catch(function(err) {
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
        console.log(err);
        return res.status(500).send("Server Error");
      });

    // Saving the new url inside url table.
    url.save()
      .then(function(urlObj) {
        console.log(urlObj, "Saved successfully");
        return res.redirect("/urls");
      })
      .catch(function(err) {
        console.log(err.messsage);
        return res.status(500).send("Server Error");
      });
    },
    /*
   clickUrl : function(req,res){
     console.log("inside clickurl")
       console.log(req.params.urlId)
       url=Urls.find({shorturl:req.params.urlId})
       //console.log(url)
       //if(!url) return res.sendStatus(404)
       //newcount=url.count++
       //console.log(url)
       console.log(url.longurl)
       url.updateOne({shorturl:req.params.urlId},{count:count++})
       .then(function(urlObj) {
        //console.log(urlObj, "Saved successfully");
        return res.redirect(url.longurl);
      })
      .catch(function(err) {
        console.log(err.messsage);
        return res.status(500).send("Server Error");
      });
    },*/
    
   }
  
    
  


  




/*
  updateUrlById: function(req, res) {
    var todoId = req.params.todoId;
    var isCompleted = req.params.isCompleted === "on";
    var userId = req.user.id;
    Todo.updateOne(
      { _id: todoId, user: userId },
      { ...req.body, isCompleted: isCompleted },
      { new: true }
    )
      .then(function(todo) {
        if (!todo) return res.status(404).send("Todo not found");
        console.log(todo);
        res.redirect("/todos");
      })
      .catch(function(err) {
        if (err.name === "CastError")
          return res.status(400).send("Invalid Todo ID");
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
        return res.status(500).send("Server Error");
      });
  },

  deleteUrlById: function(req, res) {
    var todoId = req.params.todoId;
    var userId = req.user.id;
    var todoId = req.params.todoId;
    var userId = req.user.id;
    Todo.deleteOne({ _id: todoId, user: userId })
      .then(function(todo) {
        if (!todo) return res.status(404).send("Todo not found");
        res.redirect("/todos");
      })
      .catch(function(err) {
        if (err.name === "CastError")
          return res.status(400).send("Invalid Todo ID");
        console.log(err);
        return res.status(500).send("Server Error");
      });
  }
  */
    
