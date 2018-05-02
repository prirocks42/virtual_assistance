import express from 'express';
import fs from 'fs';
const router = express.Router();


const verifyReading = (reading) => {
    if(reading.title && reading.tags && reading.description && reading.createdAt && reading.seen !== undefined && reading.link !== undefined && reading.source && reading.category && reading.level && reading.rating){
        return true;
    } 
    return false;
}

const sameReading = (reading,readingsCollection,response,insertReadingCallBack) => {
    readingsCollection.find(reading).toArray((error,result) => {
        if(error){
            response.send({
				status:400,
				error:error
			});
        } else {
            if(result.length>0){
                response.send({
                    status:400,
                    error:'Reading exits already.'
                });
            } else {
                insertReadingCallBack(reading,readingsCollection,response);
            }
        }
    })
}

const insertReading = (reading,readingsCollection,response) => {
    readingsCollection.insertOne(reading, (error,result) => {
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

const addReadingToDb = (reading,readingsCollection,response) => {
    if(!verifyReading(reading)){
        response.send({
            status:400,
            error: 'You havent filled all the required fields.',
            data:reading
        });
        return;
    }
    
    sameReading(reading,readingsCollection,response,insertReading)
	
}
const addReadings = router.post('/reading',function(request,response){
    const db = response.app.locals.settings.db.db("alexa_va");
	const readingsCollection = db.collection('reading');
    const reading = request.body.reading;
    addReadingToDb(reading,readingsCollection,response);
});

module.exports = addReadings;