var fs = require('fs');

const FILE_NAME = 'items.json';

var EMPTY_STORE = {
  nextId: 1,
  items: []
};

function fileWrite(object) {

  fs.readFile(FILE_NAME, "UTF-8", function (err) {
    if (err) throw err;

    fs.writeFile(FILE_NAME, getDataJsonStr(object), function (err) {
      if (err) throw err;
    });
  });
}

function fileCreate() {
  fs.exists(FILE_NAME, function (exists) {
    if (!exists) {
      fs.open(FILE_NAME, "a", function (err, fd) {
        if (err)  throw err;
        else {
          fs.writeFileSync(FILE_NAME, getDataJsonStr(EMPTY_STORE));
          console.log('create file!');
        }
      });
    }
  });
}

function fileOnlyRead() {
  return getDataJsonObject(fs.readFileSync(FILE_NAME, 'utf-8'));
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
