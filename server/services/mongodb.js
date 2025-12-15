const mongoose = require('mongoose');
require('dotenv').config();

const mongodb_URL = process.env.mongo_url;

async function mongodbConnect() {
    await mongoose.connect(mongodb_URL);
};

async function mongodbDisconnect() {
    await mongoose.disconnect();
};

mongoose.connection.on('open',()=>{
    console.log('your database is ready sir');
});
mongoose.connection.on('error',(error)=>{
    console.log(error);
});

module.exports = {
    mongodbConnect,
    mongodbDisconnect,
};