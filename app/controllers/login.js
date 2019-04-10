const Service = require('../service');

const index = (req, res) => res.render('index');

const authenticated = (req, res) => {
  Service.logIn(req.body)
    .then((data) => {
      const sessionData = {
        loggedIn: 1,
        userId: data.identity,
        name: data.name,
        email: data.email,
        phone: data.phone,
        userRole: data.role,
      };
      Object.assign(req.session, sessionData);
      res.render('main', { req });
    })
    .catch(() => {
      res.render('index', { message: 'Estas credenciales no coinciden con nuestros registros.' });
    });
};

const main = (req, res) => res.render('main', { req });

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = {
  index,
  authenticated,
  main,
  logout,
};
