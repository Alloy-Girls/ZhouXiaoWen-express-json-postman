var publicMethod = require('./public');

function findAll(req, res) {
  var fileData = publicMethod.fileOnlyRead();
  res.status(200).json(fileData);
}

function findOne(req, res) {
  var id = parseInt(req.params.id);

  var fileData = publicMethod.fileOnlyRead();
  var findItem = returnFindOne(id, fileData);

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