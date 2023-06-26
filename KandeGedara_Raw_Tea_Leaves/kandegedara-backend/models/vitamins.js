const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const vitaminSchema = new Schema({
  vitaminsId: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  amuont: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const vitamins = mongoose.model('vitamins', vitaminSchema);
module.exports = vitamins;
