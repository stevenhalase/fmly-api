const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3080;

const uristring =
  process.env.MONGODB_URI ||
  'mongodb://localhost/fmly';

mongoose.connect(uristring, (error) => {
  if (error) {
      console.error(error);
  } else {
      console.log('Mongoose connected successfully')
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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