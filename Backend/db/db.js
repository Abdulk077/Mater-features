// connecting to mongodb

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testings', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});