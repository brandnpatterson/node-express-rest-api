const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    res.json(users);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id }
    });

    if (!user) {
      return res.json({ id, message: 'No User exists with this id' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  const {
    email,
    username,
    firstname,
    lastname,
    password,
    password_confirm
  } = req.body;

  let errors = [];

  if (
    !email ||
    !username ||
    !firstname ||
    !lastname ||
    !password ||
    !password_confirm
  ) {
    errors.push({ message: 'All fields are required' });
  }

  if (password !== password_confirm) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ message: 'Password must be at least six characters' });
  }

  if (errors.length > 0) {
    return res.json({
      errors,
      email,
      username,
      firstname,
      lastname,
      password,
      password_confirm
    });
  }

  const hash = bcrypt.hashSync(password, 10);

  try {
    const result = await User.findOrCreate({
      where: {
        username
      },
      defaults: {
        email,
        username,
        firstname,
        lastname,
        password: hash
      }
    });

    const existingUser = result[0];
    const createdUser = result[1];

    if (!createdUser) {
      errors.push({ message: 'User already exists with that username' });
      return res.json({
        errors,
        email,
        username,
        firstname,
        lastname,
        password: hash
      });
    }

    res.json(existingUser);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/:id/update', async (req, res) => {
  const { email, username, firstname, lastname } = req.body;
  const { id } = req.params;

  try {
    await User.update(
      { email, username, firstname, lastname },
      { where: { id } }
    );

    res.json({ id, firstname, lastname, username });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.destroy({ where: { id } });

    if (!user) {
      return res.json({ id, message: 'No User exists with this id' });
    }

    res.json({ id, message: 'User has been deleted' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
