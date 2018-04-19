import express from 'express';
import fs from 'fs';
const router = express.Router();


const tasks = router.get('/tasks',function(request,response){
    const db = response.app.locals.settings.db.db("alexa_va");
	const tasksCollection = db.collection('tasks');
    tasksCollection.find({}).toArray((error,result) => {
        if(error) {
            response.send({
                status:400,
                error: error,
                
            });
        } else {
            response.send({
                status:200,
                result:result
            });
        }
    })
});

module.exports = tasks;