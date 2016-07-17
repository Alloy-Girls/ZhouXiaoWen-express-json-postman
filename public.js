var fs = require('fs');

var FILE_NAME = 'items.json';
var EMPTY_STORE = {
  nextId: 1,
  items: []
};

function fileWrite(object) {
  fs.writeFile(FILE_NAME, getDataJsonStr(object), function (err) {
    if (err) throw err;
  });
}

function fileCreate() {
  fs.exists(FILE_NAME, function (exists) {
    if (!exists) {
      fs.open(FILE_NAME, "a", function (err) {
        if (err)  throw err;
        else {
          fs.writeFileSync(FILE_NAME, getDataJsonStr(EMPTY_STORE));
          console.log('create file!');
        }
      });
    }
  });
}

function fileOnlyRead(callback) {
  fs.readFile(FILE_NAME, function (err, data) {
    if (err)  return callback(err);
    callback(getDataJsonObject(data));
  });
}

function getDataJsonStr(object) {
  return JSON.stringify(object);
}

function getDataJsonObject(string) {
  return JSON.parse(string);
}

module.exports = {
  fileWrite: fileWrite,
  fileOnlyRead: fileOnlyRead,
  fileCreate: fileCreate
};
