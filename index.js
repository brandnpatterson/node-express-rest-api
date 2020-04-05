const express = require('express');
const router = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.use(express.static('client'));
app.use('/', router);

app.listen(port, () => {
  console.log(`Node is listening at http://localhost:${port}`);
});
