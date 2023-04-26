const { MongoClient, ObjectId } = require("mongodb");
// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "catalog";
const client = new MongoClient(url);
const db = client.db(dbName);


var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
console.log("App listening at http://%s:%s", host, port);
});

app.get("/listUsers", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("Products")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get('/:id', async (req, res) => {
    const productId = req.params.id;
  
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = { id: parseInt(productId) };
    const result = await db.collection("Products").findOne(query);
  
    if (!result) {
      res.status(404).send('Product not found');
    } else {
      res.send(result);
    }
  });

  app.post("/addUser", async (req, res) => {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const k = keys[0];
    const v = values[0];
    console.log("Keys :", k, " Values", v);
    const newDocument = { _id: "600", [k]: [v] };
    const results = await db.collection("Products").insertOne(newDocument);
    res.status(200);
    res.send(results);
    });
    


  app.put('/users/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const newPrice = req.body.newPrice;
  
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
  
      const query = { _id: ObjectId(productId) };
      const update = { $set: { price: newPrice } };
  
      const result = await db.collection('Products').findOneAndUpdate(query, update, { returnOriginal: false });
      
      console.log('Updated document:', result.value);
      res.send(result.value).status(200);
      
      client.close();
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  