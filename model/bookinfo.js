var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/BookDirectory', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://r1414a:h4ck3r07@book-directory-cluster0.xfiw54k.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });


//mongoose schema for adding books



const BookNameSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: Date,
  count: Number,
  cover:{data: Buffer,contentType: String},
  desc: String
});
const BookInfo = mongoose.model('BookInfo', BookNameSchema);


module.exports = BookInfo;
