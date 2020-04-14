const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id }
    });

    if (!post) {
      return res.json({ id, message: 'No Post exists with this id' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
