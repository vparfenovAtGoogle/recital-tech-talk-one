var express = require('express');
var router = express.Router();

const sessionDb = require ('../app/init').sessionDb

/* GET home page. */
router.get('/', function(req, res, next) {
  const principal = req.query.principal || req.headers ['x-ms-client-principal-name']
  const users = sessionDb.listUsers ().map (user => {
    return {username: user.username, models: user.listModels()}
  })
  res.render('users', {
    title: 'Students',
    users,
    principal
  });
});

module.exports = router;
