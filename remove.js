var publicMethod = require('./public');

function removeOne(req, res) {
  var id = parseInt(req.params.id);
  var dataObject = publicMethod.fileOnlyRead();
  var dataBefore = dataObject.length;
  var notRemoveItems = returnNotRemove(id, dataObject);

  if (notRemoveItems.length === dataBefore) {
    res.sendStatus(404);
  }
  else {
    publicMethod.fileWrite(req, res, dataObject);
    res.sendStatus(204);
  }
}

function returnNotRemove(id, items) {
  var notRemoveItems = items;

  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      notRemoveItems.splice(i, 1);
    }
  }

  return notRemoveItems;
}

module.exports = {removeOne: removeOne};