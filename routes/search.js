var express = require('express');
var Twit = require('twit');
var config = require('../config');
var router = express.Router();

var Twitstance = new Twit(config);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'In Search' });                
});

router.get('/:searchTerm', function(req, res, next) {
  var params = { 
    q: req.params.searchTerm,
    count: 5 
  };

  getTweets(params, function(request, response){
    res.send(response);
    // res.render('index', { title: response.search_metadata.query + " quried " + response.search_metadata.count + " times." });
  });
});

function getTweets(params, callback) {
  Twitstance.get('search/tweets', params, callback);
}

module.exports = router;