import express from 'express';
import fs from 'fs';
const router = express.Router();


const verifyTask = (task) => {
    if(task.title && task.deadlineDate && task.deadlineTime && task.completed !== undefined && task.pending !== undefined && task.links.length>=0){
        return true;
    } 
    return false;
}

const sameTask = (task,tasksCollection,response,insertTaskCallBack) => {
    tasksCollection.find(task).toArray((error,result) => {
        if(error){
            response.send({
				status:400,
				error:error
			});
        } else {
            if(result.length>0){
                response.send({
                    status:400,
                    error:'Tasks exits already.'
                });
            } else {
                insertTaskCallBack(task,tasksCollection,response);
            }
        }
    })
}

const insertTask = (task,tasksCollection,response) => {
    tasksCollection.insertOne(task, (error,result) => {
		if (error) {
			response.send({
				status:400,
				error:error
			});
		} else {
			response.send({
				status:200,
				result:result
			});
		}
	})
}

const addTaskToDb = (task,tasksCollection,response) => {
    if(!verifyTask(task)){
        response.send({
            status:400,
            error: 'You havent filled all the required fields.',
            data:task
        });
        return;
    }
    
    sameTask(task,tasksCollection,response,insertTask)
	
}
const addTasks = router.post('/task',function(request,response){
    const db = response.app.locals.settings.db.db("alexa_va");
	const tasksCollection = db.collection('tasks');
    const task = request.body.task;
    addTaskToDb(task,tasksCollection,response);
});

module.exports = addTasks;