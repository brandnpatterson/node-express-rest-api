const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
