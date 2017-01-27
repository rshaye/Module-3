var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var date = new Date();

var index = require('./routes/index');
var users = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var addStatus;
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://admin:admin@ds161018.mlab.com:61018/coen3463t-t1";

MongoClient.connect(mdbUrl, function(err, database) {
    if (err) {
        console.log(err)
        return;
    }

    console.log("Connected to DB!");

    // set database
    db = database;

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', index);
	
	//List all the entries
	app.get('/tasks', function(req, res) {
		var taskCollection = db.collection('tasks');
		taskCollection.find().toArray(function(err, tasks) {
			console.log('Tasks Loaded!');
			res.render('tasklist', {
				tasks: tasks
			});
		})
	});

	//Adding New Entry
	app.get('/tasks/new', function(req, res) {
		console.log();
		var data = {
			status: addStatus
		}
		res.render('add_task', data);
		addStatus = "";
	});

	//POST Method when submitting new Entry
	app.post('/tasks/new', function(req, res) {
		var dataToSave = {
			taskName: req.body.taskName,
			taskDetails: req.body.taskDetails,
			taskDate: req.body.taskDate,
			status: req.body.status,
			taskcreated: getDate,
			taskupdated: getDate
		};

		db.collection('tasks')
		  .save(dataToSave, function(err, tasks) {
		  	if(err) {
		  		console.log('Saving Data Failed!');
		  		addStatus = 'Saving Data Failed!';
		  	}
		  	else {
		  		console.log('Saving Data Successful!');
		  		addStatus = 'Saving Data Success';
		  		res.redirect('/tasks/new');
		  	}
		  });
	});

	//Page of each Entry
	app.get('/tasks/:todoId', function(req, res) {
		var todoId = req.params.todoId;
		var taskCollection = db.collection('tasks');
		taskCollection.findOne({_id: new ObjectId(todoId)}, function(err, info) {
			res.render('taskdetails', {
				todoInfo: info
			});
		}); 
	});

	//Edit Page
	app.get('/tasks/:todoId/edit', function(req, res) {
		var todoId = req.params.todoId;
		var taskCollection = db.collection('tasks');
		taskCollection.findOne({_id: new ObjectId(todoId)}, function(err, info) {
			res.render('update_entry', {
				todoInfo: info
			});
		}); 
	})

	//POST Method when updating an entry
	app.post('/tasks/:todoId', function(req, res){

		var todoId = req.params.todoId;

		var newData = {
			taskName: req.body.taskName,
			taskDetails: req.body.taskDetails,
			taskDate: req.body.taskDate,
			status: req.body.status,
			taskupdated: getDate
		}

		
		var taskCollection = db.collection('tasks');
		taskCollection.updateOne({_id: new ObjectId(todoId)}, {$set: newData}, function(err, result) {
			if(err) {
				console.log("Item not updated!");
			}
			else {
				console.log("Item Updated!")
				res.redirect('/tasks/' + todoId)
			}
		}); 
	});

	//Delete Entry
	app.get('/tasks/:todoId/delete', function(req, res){
		var todoId = req.params.todoId;
		
		var taskCollection = db.collection('tasks');
		taskCollection.deleteOne({_id: new ObjectId(todoId)}, function(err, result) {
			if(err) {
				console.log("Item not deleted!");
			}
			else {
				console.log("Item deleted!")
				res.redirect('/tasks')
			}
		}); 
	});

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
  		var err = new Error('Not Found');
  		err.status = 404;
  		next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
  		// set locals, only providing error in development
  		res.locals.message = err.message;
  		res.locals.error = req.app.get('env') === 'development' ? err : {};

  		// render the error page
  		res.status(err.status || 500);
  		res.render('error');
	});
});

module.exports = app;
