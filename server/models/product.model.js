const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    availability: {
        required: true,
        type: String,
    },
    image: {
        type: Object,
    }
});

module.exports = mongoose.model('Product', productSchema);
