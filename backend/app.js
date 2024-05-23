const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/items');
const CartItem = require('./models/cartItems');
const Categories = require('./models/categories');

const app = express();

mongoose.connect('mongodb+srv://magasov:12345@magasov.pnjqkm6.mongodb.net/?retryWrites=true&w=majority&appName=magasov', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/cartItems', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('itemId');
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Categories.find().populate('itemId');
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});