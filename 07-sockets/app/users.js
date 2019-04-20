class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name) {
    let user = { id, name }
    this.users.push(user)
    return this.users;
  }

  getUsers() {
    return this.users
  }

  getUser(id) {
    let user = this.users.filter(user => user.id === id)[0]
    return user
  }

  removeUser(id) {
    let userRemove = this.getUser(id)
    this.users = this.users.filter(user => user.id != id)
    return userRemove
  }
}

module.exports = {
  Users
}
