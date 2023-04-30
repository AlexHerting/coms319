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
  const query = { _id: parseInt(productId) };
  const result = await db.collection("Products").findOne(query);

  if (!result) {
    res.status(404).send('Product not found');
  } else {
    res.send(result);
  }
});

  // app.post('/addUser', async (req, res) => {
  //   try {
  //     const keys = Object.keys(req.body);
  //     const values = Object.values(req.body);
  //     const k = keys[0];
  //     const v = values[0];
  //     console.log("Keys :", k, " Values", v);
  //     const newDocument = { _id: new ObjectId(), [k]: v };
  //     const results = await db.collection("Products").insertOne(newDocument);
  //     res.status(200).json(results.ops[0]);
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //     res.status(500).json({ error: 'An error occurred while adding the user.' });
  //   }
  // });
  
app.post('/addUser', async (req, res) => {
  try {
    const { _id, title, price, description, category, image, rate, count } = req.body;
    const newDocument = {
      _id,
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate,
        count,
      },
    };
    const results = await db.collection("Products").insertOne(newDocument);
    res.status(200).json(results.ops[0]);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'An error occurred while adding the user.' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const productId = req.params._id;
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

app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Product.deleteOne(query);
    const messageResponse = {
      message: `Product ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + p_id + " " + err);
  }
});