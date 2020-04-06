require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

db.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.log(`Error: ${err}`));

app.set('view engine', 'pug');
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Node is listening at http://localhost:${PORT}`);
});
