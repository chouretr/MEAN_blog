var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    author: String,
    content: String,
  	upvotes: {type: Number, default: 0},
  	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  });

ArticleSchema.methods.upvote = function(cb) 
{
  this.upvotes += 1;
  this.save(cb);
};

ArticleSchema.methods.downvote = function (cb) 
{
  this.upvotes -= 1;
  this.save(cb);
};

module.exports = mongoose.model('Article', ArticleSchema);
