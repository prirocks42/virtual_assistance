import express from 'express';
const router = express.Router();
const readingSeenUpdate = router.put('/readingSeen',function(request,response){
	const db = response.app.locals.settings.db.db("alexa_va");
	const readingsCollection = db.collection('reading');
    const reading = request.body.reading;
    reading.seen= parseInt(reading.seen)+1;
	readingsCollection.update(({title:reading.title}),(reading),(error,result) => {
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

module.exports = readingSeenUpdate;