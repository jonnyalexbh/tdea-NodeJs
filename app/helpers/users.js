const User = require('../models/user');

module.exports = {
  updateOnlineStatus: async (userId, online) => {
    const user = await User.findOneAndUpdate({ identity: userId }, { $set: { online } });
    return user;
  },
};
