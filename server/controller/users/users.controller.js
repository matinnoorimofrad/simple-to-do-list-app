const {
    registerUser,
    loginUser,
} = require('../../models/users/users.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function register(req , res) {
    const {username , email , password , confirmedPass} = req.body;
    try {
        res.status(200).json(await registerUser(username, email, password, confirmedPass));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function login(req , res) {
    const {username , password} = req.body;
    try {
        res.status(200).json(await loginUser(username,password));
    } catch(error) {
        res.status(401).json({error : error.message});
    };
};

async function userInformation(req , res) {
    res.status(200).json(req.user);
};

async function validateToken (req , res , next) {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        if(!token) {
            return res.status(401).json({error : "token is missing or expired"});
        };
        jwt.verify(token, process.env.access_token_secret,(error , decoded)=>{
            if(error){
                return res.status(401).json({error : "user is not authorized"});
            };
            req.user = decoded;
            next();        
        });
    };
};

module.exports = {
    register,
    login,
    userInformation,
    validateToken,   
};