class UserRepository {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
        return user;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    getAllUsers() {
        return this.users;
    }

    updateUser(id, updatedData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedData };
            return this.users[index];
        }
        return null;
    }

    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }

    searchUsers(name, email) {
        return this.users.filter(user => {
            return (name ? user.name.includes(name) : true) &&
                   (email ? user.email.includes(email) : true);
        });
    }
}

module.exports = UserRepository;
