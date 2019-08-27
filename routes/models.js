var express = require('express');
var router = express.Router();

const sessionDb = require ('../app/init').sessionDb

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.query.username
  const modelName = req.query.model
  const model = sessionDb.getUser (user).getModel (modelName)
  const changes = model.listChanges ().map (change => {
    const submission = change.submission
    return {
      id: change.id,
      type: change.featType.replace ('FEATTYPE_', ''),
      modification: change.modType,
      time: new Date (change.time).toLocaleString (),
      url: change.downloadUri,
      submission: submission ? `username=${user}&model=${modelName}&submission=${submission.fileName}` : null,
      principal: req.headers ['x-ms-client-principal-name']
    }
  })
  res.render('models', {
    student: user,
    model: modelName,
    imagesUri: model.user.session.imagesUri,
    modelsUri: model.user.session.modelsUri,
    changes });
});

module.exports = router;
