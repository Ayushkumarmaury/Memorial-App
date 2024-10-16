const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,

    },
    imgpath:{
        type: String,
    }
});



//create model

const users = new mongoose.model("users", userSchema );

module.exports = users;