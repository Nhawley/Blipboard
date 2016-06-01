var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GearzSchema = new Schema({
  title: {
    type:String,
    required:true
  },
  link: {
    type:String,
    required:true
  },
  preview: {
    type:String,
    required:true
  },
  note: {
      type: Schema.Types.ObjectId,
      ref: 'Note'
  }
});

var Gearz = mongoose.model('Gearz', GearzSchema);
module.exports = Gearz;
