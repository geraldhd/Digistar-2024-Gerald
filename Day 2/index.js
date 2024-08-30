//THIS CODE SAYSS REVERSE MY NAMEEEE
const { reverseString } = require('code-class-gerald');
const express = require('express');
const app = express();
app.use(express.json()); 
let users = []; 

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

app.get('/search', (req, res) => {
    const { name, email } = req.query;

    let result = users;

    if (name) {
        result = result.filter(user => user.name.includes(reverseString(name)));
    }

    if (email) {
        result = result.filter(user => user.email.includes(email));
    }

    if (result.length > 0) {
        res.send(result);
    } else {
        res.status(404).send({ error: 'No users found' });
    }
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        const newUser = {
            id: users.length + 1, 
            name: reverseString(name), 
            email
        };
        users.push(newUser);
        res.status(201).send(newUser);
    } else {
        res.status(400).send({ error: 'Name and email are required' });
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);
    
    if (user) {
        if (name) user.name = reverseString(name); 
        if (email) user.email = email;
        res.send(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send({ message: 'User deleted successfully' });
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
