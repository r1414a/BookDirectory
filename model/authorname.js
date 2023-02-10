var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/BookDirectory', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://r1414a:h4ck3r07@book-directory-cluster0.xfiw54k.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

//mongoose schema for adding authors

const AuthorNameSchema = new mongoose.Schema({
    authorname: String,
  });
  const AuthorName = mongoose.model('AuthorName', AuthorNameSchema);

module.exports = AuthorName;
