var express = require("express");
var router = express.Router();
var authenticate = require("../../middlewares/authenticate");
var urlNormalControllers = require("../../controllers/normalControllers/urlNormalControllers");

// Dashboard page
router.get("/urls", authenticate, urlNormalControllers.renderurlPage);

// Create url page
router.get("/urls/create", authenticate, urlNormalControllers.renderUrlCreatePage);

// Update url page
//router.get("/todo/update/:todoId", authenticate, urlNormalControllers.renderUpdateTodoPage);

module.exports = router;
