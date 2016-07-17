var publicMethod = require('./public');

function findAll(req, res) {
  var fileData = publicMethod.fileOnlyRead();

  res.status(200).json(fileData.items);
}

function findOne(req, res) {
  var id = parseInt(req.params.id);
  var fileData = publicMethod.fileOnlyRead();
  var findItem = returnFindOne(id, fileData.items);

  if (findItem) {
    res.status(200).json(findItem);
  }
  else {
    res.sendStatus(404);
  }
}

function returnFindOne(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      return items[i];
    }
  }
}

function insertOne(req, res) {
  var itemOne = req.body;

  if (judgeItemType(itemOne)) {
    var fileData = publicMethod.fileOnlyRead();
    var item = readyInsertOne(itemOne, fileData.nextId);
    fileData.items.push(item);
    fileData.nextId += 1;
    publicMethod.fileWrite(fileData);
    res.status(200).json(item);
  }
  else {
    res.sendStatus(400);
  }
}

function readyInsertOne(itemOne, id) {
  var insertOne = {};

  insertOne.id = id;
  insertOne.barcode = itemOne.barcode;
  insertOne.name = itemOne.name;
  insertOne.unit = itemOne.unit;
  insertOne.price = itemOne.price;

  return insertOne;
}

function judgeItemType(itemOneInfo) {
  if ((typeof (itemOneInfo.barcode) === "string") && (typeof (itemOneInfo.name) === "string") && (typeof (itemOneInfo.unit)) === "string" && (typeof (itemOneInfo.price)) === "number") {
    return true;
  }
}

function removeOne(req, res) {
  var id = parseInt(req.params.id);
  var fileData = publicMethod.fileOnlyRead();
  var fileDataLength = fileData.items.length;
  var notRemoveLength = returnCurrent(id, fileData.items).length;

  if (notRemoveLength === fileDataLength) {
    res.sendStatus(404);
  }
  else {
    publicMethod.fileWrite(fileData);
    res.sendStatus(204);
  }
}

function returnCurrent(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      items.splice(i, 1);
      break;
    }
  }

  return items;
}

function updateOne(req, res) {
  var id = parseInt(req.params.id);
  var itemOne = req.body;

  if (judgeItemType(itemOne)) {
    var fileData = publicMethod.fileOnlyRead();

    if (isExitUpdate(id, fileData.items, itemOne)) {
      publicMethod.fileWrite(fileData);
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

function isExitUpdate(id, items, itemOneInfo) {
  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      items[i].barcode = itemOneInfo.barcode;
      items[i].name = itemOneInfo.name;
      items[i].unit = itemOneInfo.unit;
      items[i].price = itemOneInfo.price;

      return true;
    }
  }
}

module.exports = {
  findOne: findOne,
  findAll: findAll,
  insertOne: insertOne,
  removeOne: removeOne,
  updateOne: updateOne
};
