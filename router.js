var itemHandlers = require('./item-handlers');
var bodyParser = require('body-parser');
var express = require('express');

var router = express();
router.use(bodyParser.json());  //body-parser 解析json格式数据

router.post('/', itemHandlers.insertItem);
router.delete('/:id', itemHandlers.removeItem);
router.put('/:id', itemHandlers.updateItem);
router.get('/:id', itemHandlers.findItem);
router.get('/', itemHandlers.findAllItems);

module.exports = router;
