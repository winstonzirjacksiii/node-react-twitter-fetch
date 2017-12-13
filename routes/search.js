import express from 'express';
import Twit from 'twit';
import config from '../config';

const router = express.Router();
const Twitstance = new Twit(config);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'In Search' });                
});

router.get('/:searchTerm', (req, res, next) => {
  var params = { 
    q: req.params.searchTerm,
    count: 5 
  };

  getTweets(params, (request, response) => {
    res.send(response);
  });
});

const getTweets = (params, callback) => {
  Twitstance.get('search/tweets', params, callback);
}

module.exports = router;