const {
    getAllTasks,
    getOneTask,
    createNewTask,
    deleteTask,
    priorityFilter,
    dueDateFilter,
    findBySearch,
    statusFilter,
    editOneTask
} = require('../../models/tasks/tasks.model');

async function showMyTasks(req , res) {
    try{
        res.status(200).json(await getAllTasks(req.user.id));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function showOneTask(req , res) {
    const taskID = req.params.id;
    const user_id = req.user.id;
    try{
        res.status(200).json(await getOneTask(taskID,user_id));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function addNewTask(req , res) {
    const task = req.body;
    const user_id = req.user.id;
    try{
        res.status(201).json(await createNewTask(task,user_id));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function removeOneTask(req , res) {
    const taskID = req.params.id;
    const user_id = req.user.id;
    try{
        res.status(200).json(await deleteTask(taskID,user_id));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function search(req, res) {
    const phrase = req.body.search;
    const user_id = req.user.id;
    try {
        res.status(200).json(await findBySearch(phrase,user_id));
    } catch(error) {
        res.status(404).json({error : error.message});
    };
};

async function filterByPriority(req , res) {
    const filter = req.body.priority;
    const user_id = req.user.id;
    try {
        res.status(200).json(await priorityFilter(filter,user_id));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function filterByDate(req, res) {
    const order = req.body.order;
    const user_id = req.user.id;
    try {
        res.status(200).json(await dueDateFilter(order,user_id));
    } catch(error) {
        res.status(400).json({error : error.message});
    };
};

async function filterByStatus(req, res) {
    const status = req.body.status;
    const user_id = req.user.id;
    try{
        res.status(200).json(await statusFilter(status,user_id));
    }catch(error) {
        res.status(400).json({error : error.message});
    };
}; 

async function edit(req , res) {
    const updatedTask = req.body;
    const user_id = req.user.id;
    try{
        res.status(200).json(await editOneTask(updatedTask,user_id));
    }catch(error) {
        res.status(400).json({error : error.message});
    };
}


module.exports = {
    showMyTasks,
    showOneTask,
    addNewTask,
    removeOneTask,
    search,
    filterByPriority,
    filterByDate,
    filterByStatus,
    edit
};