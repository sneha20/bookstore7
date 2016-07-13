var mongoose = require('mongoose'); 
var Reviews = new mongoose.Schema({  
  name: String,
  comment: String,
  rating:Number
});


var Book = new mongoose.Schema({  
  title: String,
  author: String,
  isbn:Number,
  price:Number,
  reviews:[Reviews],
  averageRating:Number
});
mongoose.model('Book', Book);