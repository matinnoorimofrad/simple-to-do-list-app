const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    id : {
        type : Number,
        required : true,
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : false,
        trim : true,
    },
    status : {
        type : String,
        required : true,
        trim : true,
        enum : ['pending' , 'in-progress' , 'done'],
        default : 'pending'
    },
    priority : {
        type : String,
        required : true,
        trim : true,
        enum : ['low' , 'medium' , 'high'],
        default : 'medium'
    },
    dueDate : {
        type : Date,
        required : false,
    },  

},{ timestamps : true});

const counterSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true

    },
    value : {
        type : Number,
        required : true,
        default : 1,
    },
});

taskSchema.index({title: 1, user_id: 1},{unique:true});

const tasks = mongoose.model('task',taskSchema);
const counter = mongoose.model('counter',counterSchema);

module.exports = {
    tasks,
    counter
};