var fs = require('fs');

const FILE_NAME = 'items.json';

function removeOne(req,res){
  var id = parseInt(req.params.id);

  fs.readFile(FILE_NAME, "UTF-8", function (err, data) {
    if (err) throw err;

    var notRemoveItems = returnNotRemove(id, JSON.parse(data));
    if (notRemoveItems.length === JSON.parse(data).length) {
      res.sendStatus(404);
    }
    else {
      fs.writeFile(FILE_NAME, JSON.stringify(notRemoveItems), function (err) {
        if (err)  throw err;
        res.sendStatus(204);
      });
    }
  });
}
function returnNotRemove(id, items) {
  var notRemoveItems = items;
  for (var i = 0; i < items.length; i++) {
    if (id === items[i].id) {
      notRemoveItems.splice(i,1);
    }
  }

  return notRemoveItems;
}

module.exports = {removeOne:removeOne};