import express from 'express';
const router = express.Router();
const taskDelete = router.put('/task',function(request,response){
	const db = response.app.locals.settings.db.db("alexa_va");
	const tasksCollection = db.collection('tasks');
    const task = request.body.task;
    task.completed=true;
	tasksCollection.update(({title:task.title}),(task),(error,result) => {
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
	});
});

module.exports = taskDelete;