var Urls = require("../../models/Urls");

module.exports = {
  renderurlPage: function(req, res) {
    var user = req.user;
    Urls.find({ user: req.user._id })
      .then(function(urls) {
        return res.render("dashboard", {
          userId: user.id,
          name: user.name,
          urls: urls,
          length: urls.length
        });
      })
      .catch(function(err) {
        console.log(err.message);
        return res.status(500).send("Server error");
      });
  },

  renderUrlCreatePage: function(req, res) {
    res.render("urlCreate", {
      userId: req.user.id,
      title: "url create page"
    });
  },
/*
  renderUpdateTodoPage: function(req, res) {
    var user = req.user;
    var todoId = req.params.todoId;
    Todo.findById(todoId)
      .then(function(todo) {
        return res.render("todoUpdate", {
          title: "Todo update page",
          userId: user.id,
          todo: todo
        });
      })
      .catch(function(err) {
        return res.status(500).send(`Server Error ${err.message}`);
      });
  }
  */
};
