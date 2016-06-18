var fs = require('fs');

const FILE_NAME = 'items.json';

function fileWrite(dataObject) {

  fs.readFile(FILE_NAME, "UTF-8", function (err) {
    if (err) throw err;

    fs.writeFile(FILE_NAME, JSON.stringify(dataObject), function (err) {
      if (err) throw err;
    });
  });
}

function fileCreate() {

  fs.open(FILE_NAME, 'w', function (err, fd) {
    if(err) throw err;
    var dataObject = [];
    fs.writeFile(FILE_NAME, getDataJsonStr(dataObject), function (err) {
      if (err) throw err;
      console.log('create file!');
    });
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
  getDataJsonStr: getDataJsonStr,
  getDataJsonObject: getDataJsonObject,
  fileCreate: fileCreate
};