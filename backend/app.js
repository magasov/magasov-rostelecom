// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/items');

const app = express();

mongoose.connect('mongodb+srv://magasov:12345@magasov.pnjqkm6.mongodb.net/?retryWrites=true&w=majority&appName=magasov', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
