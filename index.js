const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();
const AuthorName = require('./model/authorname')
const BookInfo = require('./model/bookinfo')

var bodyParser = require('body-parser')

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));


//For Serving static files
app.use('/static', express.static('static'))

// Set the template engine as Pug
app.set('view engine', 'pug');

//To tell where that views directory is in our system using path module
app.set('views', path.join(__dirname, 'views'))




//Our pug Endpoints
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/authors', (req, res) => {
  AuthorName.find({}, (err, authname) => {
    if (err) console.log(err)
    res.render('authors', { names: authname })
  })
})
app.get('/addauthors', (req, res) => {
  const str = 'Enter Authors Name'
  res.render('addauthors',{x:str})
})

app.post('/authors', (req, res) => {
  var myData = new AuthorName(req.body);
  //console.log(myData.authorname.toLowerCase())//this will lowercase whatever is written by user
  myData.save().then(() => {
    AuthorName.find({}, (err, authname) => {
      if (err) console.log(err)
      res.render('authors', {names: authname })
    })
  }).catch(() => {
    res.status(400).render('not saved')
  });

})

//for deleting names from authors
app.post('/authors/:id',async (req,res)=>{
  const id = req.params.id
  await AuthorName.findByIdAndDelete({_id:id})
  res.redirect('/authors')
  
})

//for editing a particular name
app.get('/addauthors/:id', async(req,res)=>{
  const id = req.params.id
  var data = await AuthorName.findById({_id:id})
  const name = data.authorname
  await AuthorName.findByIdAndDelete({_id:id})
  res.render('addauthors',{x:name})
})

app.get('/addbooks', (req, res) => {
  res.render('addbooks')
})

app.get('/books', (req, res) => {
  BookInfo.find({}, (err, data) => {
    if (err) console.log(err)
    res.render('books', { booksinfo: data })
  })
})
app.post('/books', (req, res) => {
  var myData = new BookInfo(req.body);
  myData.save().then(() => {
    BookInfo.find({}, (err, data) => {
      if (err) console.log(err)
      res.render('books', { booksinfo: data })
      
    })
  }).catch(() => {
    res.send(400).send('Book data not saved in the database')
  });
})

app.get('/books/:name', async(req,res)=>{
  const name = req.params.name
  var info = await BookInfo.find({author:name})
  res.render('books',{booksinfo:info})
})

//for deleting book details from books
app.post('/books/:id',async(req,res)=>{
  try{
    const id = req.params.id
    await BookInfo.findByIdAndDelete({_id:id})
    res.redirect('/books')
  }catch(error){
    console.log(error)
  }
})

//To start the server which listen on port 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});