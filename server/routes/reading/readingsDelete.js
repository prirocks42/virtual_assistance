import express from 'express';
const router = express.Router();
const readingDelete = router.put('/reading',function(request,response){
	const db = response.app.locals.settings.db.db("alexa_va");
	const readingsCollection = db.collection('reading');
    const title = request.body.title;
    console.log(title.toString());
	readingsCollection.remove(({title:title}),(error,result) => {
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

module.exports = readingDelete;