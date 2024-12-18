const mongoose = require('mongoose');

const itemschema = new mongoose.Schema({
    name: String,
    description: String 
})

const itemModel = mongoose.model('Item', itemschema)
module.exports = itemModel
