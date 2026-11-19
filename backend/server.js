
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
dotenv.config()
console.log(`Hello ${process.env.MONGO_URI}`)
const port = process.env.PORT || 3000;

const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'password-manager';
const client = new MongoClient(url);
client.connect()
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Connection error:', err));



//Get all the password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
});

//save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password)
    res.json({ success: true, result: findResult })
});

app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password)
    res.json({ success: true, result: findResult })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});