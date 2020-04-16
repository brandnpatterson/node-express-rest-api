require('dotenv').config();

const express = require('express');
const path = require('path');
const usersRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', usersRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  /* eslint-disable-next-line */
  console.log(`Node is listening at http://localhost:${port}`);
});
