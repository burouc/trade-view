const
  express = require('express'),
  router = express.Router(),
  tradeViewController = require('../controllers/trade-view.controller');

router
  .get('/', (req, res) => {
    res.send('api');
  });

router
  .post('/trade-view/place-order',
    (req, res) => tradeViewController.placeOrder(req, res));

module.exports = router;