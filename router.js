// var itemStore = require('./item-store');
var itemHandlers = require('./item-handlers');

var express = require('express');
var router = express();

var bodyParser = require('body-parser');
router.use(bodyParser.json());  //body-parser 解析json格式数据

// router.post('/', itemStore.insertOne);
// router.delete('/:id', itemStore.removeOne);
// router.put('/:id', itemStore.updateOne);
// router.get('/:id', itemStore.findOne);
// router.get('/', itemStore.findAll);

router.post('/', itemHandlers.insertItem);
router.delete('/:id', itemHandlers.removeItem);
router.put('/:id', itemHandlers.updateItem);
router.get('/:id', itemHandlers.findItem);
router.get('/', itemHandlers.findAllItems);

module.exports = router;
