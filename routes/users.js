var express = require('express');
var router = express.Router();

const sessionDb = require ('../app/init').sessionDb

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const users = sessionDb.listUsers ().map (user => {
    return {username: user.username, models: user.listModels(), principal: req.headers ['x-ms-client-principal-name']}
  })
  let headers = req.headers
  res.render('users', {
    title: 'Students',
    users,
    headers: Object.keys (headers).map (key => {
      return {key, value: headers [key]}
    })
  });
});

module.exports = router;
