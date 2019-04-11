const User = require('./app/models/user');

const defaultUsers = require('./defaultUsers.json');

const usersSeeders = async () => {
  const userCount = await User.countDocuments({});

  if (!userCount) {
    console.log('Gonna insert admin user');
    await User.insertMany(defaultUsers);
    console.log('Admin user created');
  }
};

usersSeeders()
  .then()
  .catch();
