var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookDirectory', { useNewUrlParser: true });

//mongoose schema for adding authors

const AuthorNameSchema = new mongoose.Schema({
    authorname: String,
  });
  const AuthorName = mongoose.model('AuthorName', AuthorNameSchema);

module.exports = AuthorName;