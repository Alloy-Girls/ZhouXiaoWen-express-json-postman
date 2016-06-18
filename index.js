var express = require('express');
var app = express();
var publicMethod = require('./public');
var bodyParser = require('body-parser');

app.use(bodyParser.json());  //body-parser 解析json格式数据

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

ID = 0;

publicMethod.fileCreate();

app.post('/items', require('./insert').insertOne);
app.delete('/items/:id', require('./remove').removeOne);
app.put('/items/:id', require('./update').updateOne);
app.get('/items/:id', require('./find').findOne);
app.get('/items', require('./find').findAll);

