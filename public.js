var fs = require('fs');

const FILE_NAME = 'items.json';

function fileWrite(req,res,dataObject) {

  fs.readFile(FILE_NAME, "UTF-8", function (err, data) {
    if (err) throw err;

    fs.writeFile(FILE_NAME, JSON.stringify(dataObject), function (err) {
      if (err) throw err;
    });
  });
}

function fileOnlyRead() {
  return dataJsonObject(fs.readFileSync(FILE_NAME,'utf-8'));
}

function dataJsonStr(object) {
  return JSON.stringify(object);
}

function dataJsonObject(string) {
  return JSON.parse(string);
}

module.exports = {
  fileWrite: fileWrite,
  fileOnlyRead: fileOnlyRead,
  dataJsonStr: dataJsonStr,
  dataJsonObject: dataJsonObject
};