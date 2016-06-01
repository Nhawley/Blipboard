var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlipSchema = new Schema({
  title: {
    type:String
  },
  body: {
    type:String
  }
});

var Blip = mongoose.model('Blip', BlipSchema);
module.exports = Blip;