

const express = require('express');
const app = express();
const port = 3000;

let users = [];


app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);  
  next();
});
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  let token = authHeader;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (token === 'mysecrettoken') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
}




app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});




app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);  
  next();
});



const adminRouter = express.Router(); 
adminRouter.use((req, res, next) => {
  console.log('Admin router middleware executed');
  next();
});

adminRouter.get('/dashboard', (req, res) => {
  res.send('Admin dashboard');
});

app.use('/admin', authMiddleware, adminRouter);


app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json({ message: 'User added', user });
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  users = users.map(user => (user.id === id ? updatedUser : user));
  res.status(200).json({ message: 'User updated', updatedUser });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter(user => user.id !== id);
  res.status(200).json({ message: 'User deleted' });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);  
});
