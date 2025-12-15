const {tasks} = require('./tasks.mongo');
const {counter} = require('./tasks.mongo');
const mongoose = require('mongoose');

async function goodbye() {
    await tasks.deleteMany({});
    await counter.deleteMany({});
};

//goodbye();

async function getAllTasks(user_id) {
    const allTasks = await tasks.find({user_id});
    if(allTasks.length === 0){
        throw new Error('you have no task in your list');
    } else {
        return allTasks;
    };
};

async function getOneTask(taskID,user_id) {
    const selectedTask = await tasks.findOne({id: taskID, user_id });
    if (selectedTask == null){
        throw new Error('there is a problem with the selected task');
    }else {
        return selectedTask;
    };
};

async function getNextID(user_id,session) {
    const count = await counter.findOneAndUpdate({user_id},
        {$inc: {value : 1}},
        {new: true , upsert: true , session }
    );
    return count.value;
};

async function createNewTask(task,user_id) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newID = await getNextID(user_id, session);
        const newTask = Object.assign(task , {id: newID, user_id });
        await tasks.create([newTask],{session});
        await session.commitTransaction();
        await session.endSession();
        return newTask;
    } catch(error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    };
};

async function deleteTask(taskID,user_id) {
    const selectedTask = await tasks.findOneAndDelete({id: taskID, user_id });
    if(selectedTask == null) {
        throw new Error('you can\'t remove this task');
    };
    await tasks.updateMany({user_id ,id : {$gt : selectedTask.id}},
        {$inc : {id : -1}}
    );
    await counter.findOneAndUpdate({user_id},{$inc : {value:-1}});

    return selectedTask;        
};


async function priorityFilter(filter,user_id) {
    const allTasks = await tasks.find({priority: filter, user_id});
    if(allTasks.length === 0){
        throw new Error('you have no task with this priority');
    } else {
        return allTasks;
    };
};

async function dueDateFilter(order,user_id) {
    
    if (order == 'ascending'){
        return await tasks.find({user_id})
            .sort({dueDate : 1});
    }else if (order == 'descending') {
        return await tasks.find({user_id})
            .sort({dueDate : -1});
    }else {
        throw new Error('you haven\'t choose the right order');
    };
};

async function statusFilter(filter,user_id) {
    const allTasks = await tasks.find({status: filter, user_id});
    if(allTasks.length === 0){
        throw new Error('you have no task with that status');
    } else {
        return allTasks;
    };
};

async function findBySearch(phrase,user_id) {
    const allTasks = await tasks.find({title: {$regex : phrase}, user_id});
    if(allTasks.length === 0){
        throw new Error('you have no task containing that phrase');
    } else {
        return allTasks;
    };
};

async function editOneTask(updatedTask,user_id) {
    return await tasks.findOneAndUpdate({id: updatedTask.id, user_id}, updatedTask,
        {new: true , runValidators: true});
     
};


module.exports = {
    getAllTasks,
    getOneTask,
    createNewTask,
    deleteTask,
    priorityFilter,
    dueDateFilter,
    statusFilter,
    findBySearch,
    editOneTask
};