var express = require('express');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

  var routes = [
    { path: "/apimetas", method: "GET" },
    { path: "/apimeta", method: "POST" },
    { path: "/apimeta/:id", method: "GET" },
    { path: "/apimeta/:id", method: "PUT" },
    { path: "/apimeta/:id", method: "DELETE" }
  ];

  res.render('index', {routes: routes });

});

module.exports = router;
