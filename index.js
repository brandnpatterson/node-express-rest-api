require('dotenv').config();

const express = require('express');
const usersRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', usersRoutes);

app.listen(port, () => {
  console.log(`Node is listening at http://localhost:${port}`);
});
