var itemStore = require('./item-store');

function findItem(req, res) {
  var id = parseInt(req.params.id);
  var findItem = itemStore.findOne(id);

  if (findItem) {
    res.status(200).json(findItem);
  }
  else {
    res.sendStatus(404);
  }
}

function findAllItems(req, res) {
  var fileData = itemStore.findAll();
  res.status(200).json(fileData);
}

function insertItem(req, res) {
  var itemOne = req.body;
  if(judgeItemType(itemOne)){
    var item = itemStore.insertOne(itemOne);
    res.status(200).json(item);
  }
  else {
    res.sendStatus(400);
  }
}

function removeItem(req, res) {
  var id = parseInt(req.params.id);
  var removed = itemStore.removeOne(id);

  if(removed){
    res.sendStatus(204);
  }
  else{
    res.sendStatus(404);
  }
}

function updateItem(req, res) {
  var id = parseInt(req.params.id);
  var itemOne = req.body;

  if (judgeItemType(itemOne)) {
    var updatedFlag = itemStore.updateOne(id, itemOne);
    if(updatedFlag){
      res.status(200).json(itemOne);
    }
    else {
      res.sendStatus(404);
    }
  }
  else {
    res.sendStatus(400);
  }
}

function judgeItemType(itemOneInfo) {
  if ((typeof (itemOneInfo.barcode) === "string") && (typeof (itemOneInfo.name) === "string") && (typeof (itemOneInfo.unit)) === "string" && (typeof (itemOneInfo.price)) === "number") {
    return true;
  }
}

module.exports = {
  findItem: findItem,
  findAllItems: findAllItems,
  insertItem: insertItem,
  removeItem: removeItem,
  updateItem: updateItem
};
