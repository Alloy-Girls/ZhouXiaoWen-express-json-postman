var publicMethod = require('./public');

function insertOne(req, res) {
  var itemOne = req.body;

  if (judgeItemType(itemOne)) {
    var item = readyInsertOne(itemOne);
    var dataObject = publicMethod.fileOnlyRead();

    dataObject.push(item);
    publicMethod.fileWrite(req, res, dataObject);

    res.status(200).json(item);
  }
  else {
    res.sendStatus(400);
  }
}

function readyInsertOne(itemOne) {
  var insertOne = {};

  ID += 1;
  insertOne.id = ID;
  insertOne.barcode = itemOne.barcode;
  insertOne.name = itemOne.name;
  insertOne.unit = itemOne.unit;
  insertOne.price = itemOne.price;

  return insertOne;
}

function judgeItemType(itemOne) {
  if ((typeof (itemOne.barcode) === "string") && (typeof (itemOne.name) === "string") && (typeof (itemOne.unit)) === "string" && (typeof (itemOne.price)) === "number") {
    return true;
  }
}

module.exports = {insertOne: insertOne};
