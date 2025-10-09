// server.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// --- Configuration ---
const JWT_SECRET = 'your_super_secret_key'; // Use a strong secret in a .env file in a real app
const HARDCODED_USER = { username: 'user1', password: 'password123', id: 1 };

// --- Application State (Simulated Database) ---
// We use a Map to store account balances keyed by user ID
const accounts = new Map();
accounts.set(HARDCODED_USER.id, { balance: 1000 });


// --- Middleware ---
app.use(express.json()); // Built-in middleware for parsing JSON request bodies

// Custom Middleware: Verifies the JWT and attaches user info to req.user
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // Format: Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        // 401 Unauthorized: No token provided
        return res.status(401).json({ message: 'Access Denied: Token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // 403 Forbidden: Token is invalid or expired
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        
        // Token is valid, attach user payload (id) and continue
        req.user = user;
        next();
    });
}


// ===============================================
// --- PUBLIC ROUTE: Login (Generates Token) ---
// ===============================================

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 1. Authenticate User (Hardcoded check)
    if (username !== HARDCODED_USER.username || password !== HARDCODED_USER.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Generate Token Payload (include minimal user info)
    const payload = { id: HARDCODED_USER.id, username: HARDCODED_USER.username };

    // 3. Sign and Return Token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: token });
});


// ===============================================
// --- PROTECTED BANKING ROUTES ---
// All routes below use the authenticateToken middleware
// ===============================================

// GET /balance: View current account balance
app.get('/balance', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const account = accounts.get(userId);
    
    // Safety check (should always exist in this setup)
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ balance: account.balance });
});


// POST /deposit: Deposit funds into the account
app.post('/deposit', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit amount' });
    }

    const account = accounts.get(userId);
    account.balance += amount;

    res.json({
        message: Deposited $${amount},
        newBalance: account.balance
    });
});


// POST /withdraw: Withdraw funds from the account
app.post('/withdraw', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    const account = accounts.get(userId);
    
    // Handle insufficient balance error
    if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
    }

    account.balance -= amount;

    res.json({
        message: Withdrew $${amount},
        newBalance: account.balance
    });
});


// --- Start Server ---
app.listen(port, () => {
    console.log(Server running on http://localhost:${port});
});