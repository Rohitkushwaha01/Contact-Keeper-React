const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
    },
    number: {
        type: Number,
    },
    email: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    },
    loaction: {
        type: String
    },
    desc: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
});


module.exports = Contact = mongoose.model('contact', ContactSchema);