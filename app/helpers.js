const hbs = require('hbs');

hbs.registerHelper('isAdmin', ({ session: { userRole } }) => {
  if (userRole === 'admin') {
    return true;
  }
  return false;
});
