var publicMethod = require('./public');

function updateOne(req, res) {
  var id = parseInt(req.params.id);
  var itemOneInfo = req.body;

  if (judgeItemType(itemOneInfo)) {
    var fileData = publicMethod.fileOnlyRead();

    if (isExitUpdate(id, fileData, itemOneInfo)) {
      publicMethod.fileWrite(fileData);
      res.status(200).json(itemOneInfo);
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

function judgeItemType(itemOneInfo) {
  if ((typeof (itemOneInfo.barcode) === "string") && (typeof (itemOneInfo.name) === "string") && (typeof (itemOneInfo.unit)) === "string" && (typeof (itemOneInfo.price)) === "number") {
    return true;
  }
}

module.exports = {updateOne: updateOne};
