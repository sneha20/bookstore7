var express = require('express'),
router = express.Router(),
marko = require('marko'),
mongoose = require('mongoose'),
Article = mongoose.model('Article');
var list = require('marko').load(require.resolve('../views/List.marko'));
var addBook= require('marko').load(require.resolve('../views/addBook.marko'));
var addReview= require('marko').load(require.resolve('../views/addReview.marko'));
var searchBook=require('marko').load(require.resolve('../views/searchBook.marko'));
var updateBook=require('marko').load(require.resolve('../views/updateBook.marko'));

module.exports = function (app) {
  app.use('/books', router);
};
//router.use(bodyParser.urlencoded({ extended: true }));
router.route('/')
.get(function(req, res, next){

  mongoose.model('Book').find({}, function(err, books){
    if(err || books==""){

      var message="No books to display!"
      list.render( {message:message} ,res);
    }
    else{
      var sum;
      var averageRating;
      var arr = new Array();
      for(var i=0;i<books.length;i++)
      {
        sum=0;
        for(var j=0;j<books[i].reviews.length;j++)
        {
          sum+=books[i].reviews[j].rating;
        }
        averageRating=sum/books[i].reviews.length;
        books[i].averageRating =averageRating;
      }
      var reviews=books.reviews;
      list.render({books:books,reviews:reviews},res);
    }
  });
});



router.route('/addBooks')
.get(function(req, res, next){
  var message="Add a book";
  addBook.render({message:message},res);
  
})
.post(function(req, res){

  var title = req.body.title;
  var author = req.body.author;
  var isbn = req.body.isbn;
  var price=req.body.price;
  console.log("titleeeeeeee",title);

  
  mongoose.model('Book').create({
    title: title,
    author: author,
    isbn:isbn,
    price:price,
    

  });

  res.redirect('/books')
});



router.route('/delete/:id')

.post(function(req, res){

  mongoose.model('Book').findById(req.params.id, function(err, book){
    console.log("Request", req);
    if(err){
      res.status = 200
      res.format({
        json: function(){
          res.json({"Message": "Book not found"});
        }
      })
    }
    else{
      book.remove(function(err, book){

        if(err){
          res.status = 200
          res.format({
            json: function(){
              res.json({"Message": "Error while removing book"});
            }
          })
        }
        else{
          res.status =200;
          res.format({
            json: function(){
              res.redirect('/books');
            }

          })
        }
      })
    }
  })
});

router.route('/addReview/:id')

.get(function(req, res, next){
  var message="Add a Review :-";
  addReview.render({message:message},res);
  
})
.post(function(req, res, next){
  var bookid = req.params.id;
  var name = req.body.Name;
  var comment = req.body.comment;
  var rating = req.body.rating;
  mongoose.model('Book').findById(req.params.id, function(err, book){
    console.log("error is",err);
    
    if(err){
      res.status = 200
      res.format({
        json: function(){
          res.json({"Message": "Book not found"});
        }
      })
    }
    else{
      
      book.reviews.push({name: name,comment: comment, rating: rating});
      
      book.save(function (err) {
        if (!err){ 
          res.redirect("/books");
          
        } else{
          res.send("There was an error !");
        }
      });
    }
  })
});


router.route('/searchBook')
.post(function(req, res, next){
  var search=req.body.search;
  mongoose.model('Book').find({'title':search},function(err, book){
    if(err || book==""){
      res.status = 200
      res.format({
        json: function(){
          res.json({"Message": "Book not found"});
        }
      })
    }
    else 
    {
      searchBook.render({book:book},res);

    }
    
  })
});


router.route('/update/:id')
.get(function(req, res, next){
  mongoose.model('Book').findById(req.params.id, function(err, book){
    console.log("Book", book);
    if(err){
      res.status = 200
      res.format({
        json: function(){
          res.json({"Message": "Book not found"});
        }
      })
    }
    else{
      
      updateBook.render({book:book},res);
    }
  });
});
router.route('/update/:id')
.post(function(req, res){
  var title = req.body.title;
  var author = req.body.author;
  var isbn = req.body.isbn;
  var price=req.body.price;
  console.log("title isssss",title);
  mongoose.model('Book').findById(req.params.id, function(err, book){
    if(err){
      res.status = 200
      res.format({
        json: function(){
          res.json({"Message": "Book not found"});
        }
      })
    }
    else{
      
      book.title=title;
      book.author=author;
      book.isbn=isbn;
      book.price=price;
      book.save();

    }
    res.redirect('/books')
  })
});

/*module.exports = router;*/
