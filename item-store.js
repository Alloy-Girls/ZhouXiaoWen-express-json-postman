var publicMethod = require('./public');

function findAll(callback) {
  publicMethod.fileOnlyRead(function (fileData) {
    callback(null, fileData.items);
  });
}

function findOne(id, callback) {
  publicMethod.fileOnlyRead(function (fileData) {
    callback(null, returnFindOne(id, fileData.items));
  });
}

function returnFindOne(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      return items[i];
    }
  }
}

function insertOne(itemOne, callback) {
  publicMethod.fileOnlyRead(function (fileData) {
    var item = readyInsertOne(itemOne, fileData.nextId);

    fileData.items.push(item);
    fileData.nextId += 1;
    publicMethod.fileWrite(fileData);
    callback(null, item);
  });
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

function removeOne(id, callback) {
  publicMethod.fileOnlyRead(function (fileData) {
    var fileDataLength = fileData.items.length;
    var notRemoveLength = returnCurrent(id, fileData.items).length;

    if (notRemoveLength === fileDataLength) {
      callback(null, false);
    }
    else {
      publicMethod.fileWrite(fileData);
      callback(null, true);
    }
  });
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

function updateOne(id, itemOne, callback) {
  publicMethod.fileOnlyRead(function (fileData) {
    if (isExitUpdate(id, fileData.items, itemOne)) {
      publicMethod.fileWrite(fileData);
      callback(null, true);
    }
    else {
      callback(null, false);
    }
  });
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
