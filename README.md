This is a project!
===========================================

Steps
-----

### create directory, config files and download deps

```
mkdir myapp
cd myapp
npm init -y
npm install express --save
```

### use `nodemon` to auto-reload

```
npm install -g nodemon
```

### write code

The code is already in this project

### run code

```
node index.js
```

or

```
nodemon index.js
```

### visit

```
curl http://localhost:3000/items
curl http://localhost:3000/items/1
curl -X POST -d '{"barcode": "ITEM08","name": "可乐","unit": "瓶","price":3.5}' -H "Content-Type: application/json" http://localhost:3000/items/1
```
