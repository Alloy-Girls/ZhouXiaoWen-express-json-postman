#**How to use an express application**
===========================================

### You may need to install `body-parser` and `nodemon`

```
npm install  body-parser --save
npm install -g nodemon --save
```

### run code

```
node index.js
```

or

```
nodemon index.js
```

###

```
curl http://localhost:3000/items
curl http://localhost:3000/items/1
curl -X POST -d '{"barcode": "ITEM08","name": "可乐","unit": "瓶","price":3.5}' -H "Content-Type: application/json" http://localhost:3000/items/1
```
