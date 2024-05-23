const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true },
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;