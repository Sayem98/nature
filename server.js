const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
dotenv.config({
  path: './config.env',
});
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
const local_db = process.env.DATABASE_LOCAL;
mongoose
  .connect(process.env.NODE_ENV === 'development' ? local_db : db, {})
  .then((con) => {
    console.log('DB connection successful');
  });

const port = 3080;

app.listen(process.env.PORT || port, () => {
  console.log(`App running on port ${process.env.PORT || port} `);
});
