var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var entrySchema = new Schema({
    taskName: {
    	type: String,
    	required: true
    },
    taskDetails: {
    	type: String,
    	required: true
    },
    taskDate: {
    	type: String,
    	required: true
    },
    status: {
    	type: String,
    	required: true
    },
 
    taskcreated: String,
    taskupdated: String,
},
{
    collection: 'tasks'
});

module.exports = mongoose.model('Entry', entrySchema);
