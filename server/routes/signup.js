import express from 'express';
const router = express.Router();

const addUserToDb = (user,usersCollection,response) => {
	usersCollection.insertOne(user, (error,result) => {
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

const signup = router.post('/signup',function(request,response){
	const db = response.app.locals.settings.db.db("alexa_va");
	
	const usersCollection = db.collection('users');
	const user = request.body.user;
	
	usersCollection.find(user).toArray((error,result) => {
		if (error) {
			response.send({
				status:400,
				error:error
			});
		} else {
			if(result.length>0){
				response.send({
					status:201,
					error:'Already exist such user.'
				});
			} else {
				addUserToDb(user,usersCollection,response);
			}
		}
	});
	
});

module.exports = signup;