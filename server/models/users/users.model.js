const users = require('./users.mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function goodbye() {
    await users.deleteMany({});
};

//goodbye();

async function registerUser (username , email , password, confirmedPass) {
    
    if (!username || !email || !password || !confirmedPass){
        throw new Error('all fields are madatory!');
    };

    if (password !== confirmedPass) {
        throw new Error("please confirm your password");
    };
    
    const emailCheck = await users.findOne({email});
    if (emailCheck){
        throw new Error('this email have already registerd');
    };

    const usernameCheck = await users.findOne({username});
    if (usernameCheck) {
        throw new Error('this username is already used');
    };

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = {
        username,
        email,
        password : hashedPassword,
    };
 
    try {
        await users.create(newUser);
    } catch(error) {
        console.log(error);
        throw new Error('user data is not valid');
    };

    const output = {username , email, result : "you have successfully registered"};
    return output;
};

async function loginUser (input , password) {
    
    if (!input || !password) {
        throw new Error('all fields are mandatory');
    };

    const user = await users.findOne({$or : [{username: input} , {email: input}]});
    if (user && await bcrypt.compare(password , user.password)) {
        const accessToken = jwt.sign({
            username : user.username,
            email : user.email,
            id : user.id
        },process.env.access_token_secret,
        {expiresIn : "10m"});
        return {accessToken, result: "you have successfully loged in" };    
    } else {
        throw new Error('username or password is not valid');
    };
};
 

module.exports = {
    registerUser,
    loginUser,
};