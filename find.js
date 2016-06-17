var fs = require('fs');

const FILE_NAME = 'items.json';

function findAll(req,res){
  fs.readFile(FILE_NAME, "UTF-8", function (err, data) {
    if (err) throw err;

    res.status(200).json(JSON.parse(data));
  });
}

function findOne(req, res) {
  var id = parseInt(req.params.id);

  fs.readFile(FILE_NAME, "UTF-8", function (err, data) {
    if (err) throw err;

    var findItem = returnFindOne(id, JSON.parse(data));
    if (findItem) {
      res.status(200).json(findItem);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function returnFindOne(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      return items[i];
    }
  }
}

module.exports = {
  findOne:findOne,
  findAll:findAll
};