const User = require('./app/models/user');
const Service = require('./app/service');

const defaultUsers = require('./defaultUsers.json');

const usersSeeders = async () => {
  const userCount = await User.countDocuments({});

  if (!userCount) {
    console.log('Gonna insert admin user');
    defaultUsers.forEach((user) => {
      Service.registerUser(user);
    });
    console.log('Admin user created');
  }
};

usersSeeders()
  .then()
  .catch();
