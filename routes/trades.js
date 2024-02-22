const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/trades');

router.post('/', tradesController.createTrade);
router.get('/', tradesController.getTrades);
router.get('/:id', tradesController.getTradeById);
router.put('/:id', tradesController.methodNotAllowed);
router.patch('/:id', tradesController.methodNotAllowed);
router.delete('/:id', tradesController.methodNotAllowed);

module.exports = router;
