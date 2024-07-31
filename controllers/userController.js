const User = require('../models/user');

exports.getUserById = async (req, res) => {
  try {
    const [user] = await User.findById(req.params.id);
    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
