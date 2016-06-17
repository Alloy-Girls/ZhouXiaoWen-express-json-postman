var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());  //body-parser 解析json格式数据

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const FILE_NAME = 'items.json';
ID = 0;

fs.exists(FILE_NAME, function (exists) {
  if (!exists) {
    var dataObject = [];

    fs.writeFile(FILE_NAME, JSON.stringify(dataObject), function (err) {
      if (err) throw err;
      console.log('create file!');
    });
  }
});

app.post('/items', require('./insert').insertOne);
app.delete('/items/:id', require('./remove').removeOne);
app.put('/items/:id', require('./update').updateOne);
app.get('/items/:id', require('./find').findOne);
app.get('/items', require('./find').findAll);

