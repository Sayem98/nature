const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// const local_db = process.env.DATABASE_LOCAL;
mongoose.connect(db, {}).then((con) => {
  console.log('DB connection successful');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});

// process.on('unhandledRejection', (err) => {
//   console.log(err.name, err.message);
// });
