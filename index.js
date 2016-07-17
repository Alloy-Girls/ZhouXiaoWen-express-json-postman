var express = require('express');
var publicMethod = require('./public');

var app = express();
publicMethod.fileCreate();
app.use('/items', require('./router'));

var server = app.listen(3000, function () {
  console.log('Example app listening at http://%s', server.address().port);
});
