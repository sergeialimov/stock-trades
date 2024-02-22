const Trade = require('../models/trades');

exports.createTrade = async (req, res) => {
  if (req.body.shares < 1 || req.body.shares > 100 || !['buy', 'sell'].includes(req.body.type)) {
    return res.status(400).send('Invalid trade data');
  }

  try {
    const trade = new Trade(req.body);
    await trade.save();
    res.status(201).json(trade);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTrades = async (req, res) => {
  const query = {};
  if (req.query.type) query.type = req.query.type;
  if (req.query.user_id) query.user_id = parseInt(req.query.user_id, 10);

  try {
    const trades = await Trade.findAll({
      where: query,
      order: [['id', 'ASC']]
    });
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findByPk(req.params.id);
    if (!trade) {
      return res.status(404).send('ID not found');
    }
    res.status(200).json(trade);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send('Method Not Allowed');
};
