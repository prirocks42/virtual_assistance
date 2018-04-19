import express from 'express';
const router = express.Router();
const login = router.post('/login',function(request,response){
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
			response.send({
				status:200,
				result:result
			});
		}
	});
});

module.exports = login;