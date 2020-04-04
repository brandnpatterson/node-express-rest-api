exports.home = (req, res) => {
  res.render('home');
};

exports.auth = (req, res) => {
  res.render('auth');
};

exports.profile = (req, res) => {
  res.render('profile');
};

exports.messages = (req, res) => {
  res.render('messages');
};
