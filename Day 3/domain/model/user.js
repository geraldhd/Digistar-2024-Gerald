class User {
    constructor(id, name, reverseName, email, password) {
        this.id = id;
        this.name = name;
        this.reverseName = reverseName; 
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
