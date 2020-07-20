const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // bring in uri from default.json file

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit from process with failure
  }
};

module.exports = connectDB;

// Below is same but not using async await
// const connectDB = () => {
//     mongoose
//       .connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//       })
//       .then(() => console.log('MongoDB connected'))
//       .catch((err) => {
//         console.error(err.message);
//         process.exit(1);
//       });
//   };
