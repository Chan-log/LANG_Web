const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

app.use(express.static('views'));

MongoClient.connect('mongodb+srv://root:go_159159159@cluster0.j1qgc.mongodb.net/minecraft?retryWrites=true&w=majority', function(er, client){
	app.listen(8080, function(){
		db = client.db('database');
		console.log('listening on 8080')
	});
})


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.get('/search', function(req, res){
	console.log(req.query.value)
	db.collection('collection').find({name: req.query.value}).toArray(function(err, respon){
		// console.log(respon);
		if(respon == ""){
			res.sendFile(__dirname + '/index.html')
		} else {
			let okane = respon[0].money;
			let unit = "원";
			if (okane >= 10000){
				okane = okane / 10000;	
				unit = "만원";
			}
			let bbreak = respon[0].break;
			let bunit = "블록";
			if (bbreak >= 10000){
				bbreak = bbreak / 10000;	
				bunit = "만 블록";
			}
			res.render('search.ejs', {name : respon, money : Math.round(okane), unit : unit, bbreak : bbreak, bunit : bunit });
			console.log(okane + unit + bbreak + bunit);
		}
	})
});