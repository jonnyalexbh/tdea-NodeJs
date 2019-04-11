const hbs = require('hbs');

hbs.registerHelper('isAdmin', ({ session: { userRole } }) => userRole === 'admin');
hbs.registerHelper('isSelectedRole', (currentRole, displayedRole) => currentRole === displayedRole);
