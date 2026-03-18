const mongoose = require('mongoose');
const config = require('../config');

async function connect() {
  const uri = config.mongoUri;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
}

module.exports = {
  connect,
};
