const Service = require('../service');

const list = (req, res, next) => {
  Service.listUsers()
    .then((users) => {
      res.render('users', { users, req });
    })
    .catch(error => next(error));
};

const editUser = (req, res, next) => {
  Service.findUser(req.params.userId)
    .then((user) => {
      res.render('edit-users', { ...user, req });
    })
    .catch(error => next(error));
};

const updateUser = (req, res, next) => {
  Service.updateUser(req.body)
    .then(() => {
      res.redirect('/users');
    })
    .catch(error => next(error));
};

module.exports = {
  editUser,
  list,
  updateUser,
};
