const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Post;
