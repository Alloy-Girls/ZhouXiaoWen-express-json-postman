var itemStore = require('./item-store');
var express = require('express');
var router = express();

var bodyParser = require('body-parser');
router.use(bodyParser.json());  //body-parser 解析json格式数据

router.post('/', itemStore.insertOne);
router.delete('/:id', itemStore.removeOne);
router.put('/:id', itemStore.updateOne);
router.get('/:id', itemStore.findOne);
router.get('/', itemStore.findAll);

module.exports = router;
