const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3080;

const uristring =
  process.env.MONGODB_URI ||
  'mongodb+srv://stevenhalase:maggie11@cluster0-38v9n.mongodb.net/test?retryWrites=true';

mongoose.connect(uristring, (error) => {
  if (error) {
      console.error(error);
  } else {
      console.log('Mongoose connected successfully')
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("Origin"));
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const UserRoutes = require('./routes/UserRoutes');
app.use('/api/users', UserRoutes);

const PostRoutes = require('./routes/PostRoutes');
app.use('/api/posts', PostRoutes);

const CommentRoutes = require('./routes/CommentRoutes');
app.use('/api/comments', CommentRoutes);

const LikeRoutes = require('./routes/LikeRoutes');
app.use('/api/likes', LikeRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
})