var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nodepop_api' });
});

/*
//parametros en la ruta
router.get('/parametros/:id', function(req, res, next) {
    const id = req.params.id;
    console.log(req.params);
    res.send('ok');
});

//parametros en la query-string - http://host/?variable=valor&variable2=valor2
router.get('/parametros', function(req, res, next) {
    console.log('req.query', req.query);
    res.send('ok con query');
});

//parametros en el body
router.post('/parametros', function(req, res, next) {
    console.log('req.body', req.body);
    res.send('ok, recibido post');
});

*/
module.exports = router;
