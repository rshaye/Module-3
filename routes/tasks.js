var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Entry = require('../models/entry');

var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://admin:admin@ds135689.mlab.com:35689/db2"

var addStatus;

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

//List all the entries
  router.get('/tasks', function(req, res) {
    var taskCollection = db.collection('tasks');
    taskCollection.find().toArray(function(err, tasks) {
      console.log('Tasks Loaded!');
      res.render('tasklist', {  
        tasks: tasks
      });
      })
  });

  //Adding New Entry
  router.get('/tasks/new', function(req, res) {
    console.log();
    var data = {
      status: addStatus
    }
    res.render('addtask', data);
    addStatus = "";
  });

  //POST Method when submitting new Entry
  router.post('/tasks/new', function(req, res) {
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
          res.redirect('/tasks');
        }
      });
  });

  //Page of each Entry
  router.get('/tasks/:todoId', function(req, res) {
    var todoId = req.params.todoId;
    var taskCollection = db.collection('tasks');
    taskCollection.findOne({_id: new ObjectId(todoId)}, function(err, info) {
      res.render('taskdetails', {
        todoInfo: info
      });
    }); 
  });

  //Edit Page
  router.get('/tasks/:todoId/edit', function(req, res) {
    var todoId = req.params.todoId;
    var taskCollection = db.collection('tasks');
    taskCollection.findOne({_id: new ObjectId(todoId)}, function(err, info) {
      res.render('task_update', {
        todoInfo: info
      });
    }); 
  })

  //POST Method when updating an entry
  router.post('/tasks/:todoId', function(req, res){

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
  router.get('/tasks/:todoId/delete', function(req, res){
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
  router.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // error handler
  router.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
  });

module.exports = router;
