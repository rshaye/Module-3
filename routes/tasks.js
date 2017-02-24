var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Entry = require('../models/entry');

var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://admin:admin@ds161018.mlab.com:61018/coen3463t-t1";

var addStatus;

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

//List all the entries
  router.get('/', function(req, res){
  Entry.find(function(err, tasks){
    res.render('tasklist', {
        tasks: tasks,
        user: req.user
      });
  })
});
  router.post('/', function(req,res){
    res.redirect('/tasks')
  })

//Adding New Entry
router.get('/new', function(req, res) {
  console.log();
  var data = {
    status: addStatus,
    user: req.user
  }
  res.render('addtask', data);
  addStatus = "";
});

//POST Method when submitting new Entry
router.post('/new', function(req, res) {
  var dataToSave = {
    taskName: req.body.taskName,
    taskDetails: req.body.taskDetails,
    taskDate: req.body.taskDate,
    status: req.body.status,
    taskcreated: getDate,
    taskupdated: getDate
  };

  var data = new Entry(dataToSave)
  data.save(function(err, tasks){
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
router.get('/:todoId', function(req, res) {
  var todoId = req.params.todoId;
  Entry.findById(todoId, function(err, info){
    res.render('taskdetails', {
      todoInfo: info,
      user: req.user
    });
  }); 
});

//Edit Page
router.get('/:todoId/edit', function(req, res) {
  var todoId = req.params.todoId;

  Entry.findById(todoId, function(err, info) {
    res.render('task_update', {
        todoInfo: info,
        user: req.user
    })
  })
});

//POST Method when updating an entry
router.post('/:todoId', function(req, res){
  var todoId = req.params.todoId;

  var newData = {
    taskName: req.body.taskName,
    taskDetails: req.body.taskDetails,
    taskDate: req.body.taskDate,
    status: req.body.status,
    taskupdated: getDate
  }

  Entry.update({_id: todoId}, {$set: newData}, function(err, result) {
    
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
router.get('/:todoId/delete', function(req, res){
  var todoId = req.params.todoId;
  Entry.findByIdAndRemove(todoId).exec();
  res.redirect('/tasks')
})

module.exports = router;
