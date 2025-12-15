const http = require('http');
const app = require('./services/app');
const { mongodbConnect } = require('./services/mongodb');
require('dotenv').config();

const PORT = process.env.port;

const server = http.createServer(app);

async function startServer() {
    
    await mongodbConnect();
    server.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}...`);
    });
};

startServer();