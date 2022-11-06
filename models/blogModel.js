const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogModel = new Schema({
  id: ObjectId,
  title: { type: String,  },
  description: { type: String, },
  read_count: { type: Number },
  reading_time: { type: String },
  state: { type: String },
  tags: { type: [String] },
  body: { type: String, require: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
}, { timestamps: true });

BlogModel.pre('save', async function (next) {  
  const averageWordPerMinute = 238;
  const numberOfWordsInArticleBody = this.body.split(' ').length;
  this.reading_time = Math.ceil(numberOfWordsInArticleBody / averageWordPerMinute);

  next();
});

const Blog = mongoose.model('Blogs', BlogModel);

module.exports = Blog;
