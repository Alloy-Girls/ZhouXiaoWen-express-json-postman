var itemStore = require('./item-store');

function findItem(req, res, next) {
  var id = parseInt(req.params.id);

  itemStore.findOne(id, function (err, findItem) {
    if (err) return next(err);
    if (findItem) {
      res.status(200).json(findItem);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function findAllItems(req, res, next) {
  itemStore.findAll(function (err, fileData) {
    if (err) return next(err);
    res.status(200).json(fileData);
  });
}

function insertItem(req, res, next) {
  var itemOne = req.body;
  if (judgeItemType(itemOne)) {
    // var item = itemStore.insertOne(itemOne);
    itemStore.insertOne(itemOne, function (err, item) {
      if (err) return next(err);
      res.status(200).json(item);
    });
  }
  else {
    res.sendStatus(400);
  }
}

function removeItem(req, res, next) {
  var id = parseInt(req.params.id);

  itemStore.removeOne(id, function (err, removed) {
    if (err) return next(err);
    if (removed) {
      res.sendStatus(204);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function updateItem(req, res, next) {
  var id = parseInt(req.params.id);
  var itemOne = req.body;

  if (judgeItemType(itemOne)) {
    itemStore.updateOne(id, itemOne, function (err, updatedFlag) {
      if (err) return next(err);
      if (updatedFlag) {
        res.status(200).json(itemOne);
      }
      else {
        res.sendStatus(404);
      }
    });
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
