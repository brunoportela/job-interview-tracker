const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // sets the name of the DB that our collections are part of
    dbName: 'interviewTrackerDB'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: String
});

const Test = mongoose.model('test', testSchema);

const interviewSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  details: String,
  status: { type: String, default: 'lead' },
  created_at: { type: Date, default: Date.now }
});

const Interview = mongoose.model('interview', interviewSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  Interview
};
