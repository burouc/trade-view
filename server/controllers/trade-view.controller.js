class TradeViewController {

  placeOrder (req, res) {
    const order = req.body;

    res.json({success: true});
  }
}

module.exports = new TradeViewController();
