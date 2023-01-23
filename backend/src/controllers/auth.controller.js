const authServices = require('../services/auth.services');

exports.loginAuth = async (req, res) => {
  try {
    const token = await authServices.login(req.body);
    req.session = { token: token }; // set cookie session
    return res.status(200).json({
      message: 'User logged in successfully!',
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logoutAuth = async (req, res) => {
  req.session = null;
  return res.status(200).send({ message: 'User logged out successfully!' });
};

exports.activeAuth = async (req, res) => {
  try {
    const token = req.session.token;
    const user = await authServices.active(token);
    return res.status(200).json({
      message: 'User retrieved successfully!',
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
