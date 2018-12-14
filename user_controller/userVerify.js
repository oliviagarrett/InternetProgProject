var express = require ('express');
var router = express.Router();

var appVars=require('../pServer.js')

router.post('/', function (req, res) {
	console.log(req.body.email)
	console.log(req.body.pwd)
	var p = appVars.getPublicPath()
	var db = appVars.getDb()
	var query = {user:req.body.email, pwd:req.body.pwd}

	db.collection("admin").find(query).toArray(function (err, results) {
		if(err) throw err
			else 
				if (results.length>0) {
					console.log("Login with : "+req.body.email)
					req.session.regenerate(function() {
						req.session.user=req.body.email
					})
					res.sendFile(`${p}/adminIndex.html`)
				}
				else {
					console.log("Invalid!")
					res.send('<html><h1> Your username and password are incorrect! Try again!')
				}
	})
})
module.exports = router;