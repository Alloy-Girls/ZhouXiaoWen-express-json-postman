var publicMethod = require('./public');

function findAll(req, res) {
  var dataObject = publicMethod.fileOnlyRead();
  res.status(200).json(dataObject);
}

function findOne(req, res) {
  var id = parseInt(req.params.id);

  var dataObject = publicMethod.fileOnlyRead();
  var findItem = returnFindOne(id, dataObject);

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

module.exports = {
  findOne: findOne,
  findAll: findAll
};