const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));

// making the test schema
const toDeleteItems = [{
	_id:"616bc063ad46a9cbab6fee53"
},{
	_id:"616bc0c3ad46a9cbab6fee57"
}]

mongoose.connect('mongodb://localhost:27017/testDB');
const testSchema = {
	name:String,
	message:String 
}

const Test = mongoose.model('Test',testSchema);

// const test = new Test({
// 	name:"Anubhav2",
// 	message:"I am a boy2"
// })
// test.save().
// then(()=>console.log("Document inserted successfully"))
app.route('/test')
.get(function(req,res){
	Test.find({},function(err,result){
		if(!err){
			res.send(result);
			res.status(200);
		}else{
			res.send(err);
			res.status(505);
		}
	})
})
.post(function(req,res){
	let lname = req.body.name;
	let lmessage = req.body.message;
	// console.log(req.body);
	const test = new Test({
		name : lname,
		message : lmessage 
	});
	test.save().then(function(){
		res.send("Posted Successfully")
	}).catch(function(err){
		console.log(err);
	})
})
.delete(function(req,res){
	// Test.deleteOne({name:"Anubhav_Post"},function(err){
		// if(!err){
		// 	res.send("Item Deleted!");
		// 	res.status(200);
		// }else{
		// 	res.send(err);
		// }
	// })
	// toDeleteItems.map(function(ele){

	// 	Test.deleteMany(ele,function(err){
	// 		if(!err){
	// 			res.send("Item Deleted!");
	// 			res.status(200);
	// 		}else{
	// 			res.send(err);
	// 			res.status(500);
	// 		}
	// 	})
	// })
	Test.deleteMany({},function(err){
		if(!err){
			res.send("Item deleted");
		}
	})
});

app.route('/test/:testName')
.get(function(req,res){
	Test.findOne({name:req.params.testName},function(err,result){
		if(!err){
			res.send(result);
		}else{
			res.send(err);
		}
	})
})
.put(function(req,res){
	Test.updateOne({name:"Anubhav_Bhai"},function(err){
		if(!err){
			res.send("Updated Successfully")
		}else{
			res.send(err);
		}
	})
});



app.listen(port,function(){
	console.log("Server started at 3000");
})










