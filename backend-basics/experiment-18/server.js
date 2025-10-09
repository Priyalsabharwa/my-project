// server.js
const express = require('express');
const connectDB = require('./db');
const User = require('./UserModel');

const app = express();
const port = 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// ===============================================
// --- Route 1: Create Initial Users (for setup) ---
// ===============================================
// POST /create-users
app.post('/create-users', async (req, res) => {
    try {
        // Clear old users and create new ones
        await User.deleteMany({});
        
        const initialUsers = [
            { name: 'Alice', balance: 1000 },
            { name: 'Bob', balance: 500 }
        ];

        const users = await User.insertMany(initialUsers);
        
        // Format the output
        const formattedUsers = users.map(user => ({
            name: user.name,
            balance: user.balance,
            _id: user._id.toString(),
            __v: user.__v    // fixed _v to __v (MongoDB version key)
        }));

        res.status(201).json({ 
            message: 'Users created.', 
            users: formattedUsers 
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating users', error: error.message });
    }
});

// ===============================================
// --- Route 2: Money Transfer Logic ---
// ===============================================
// POST /transfer
app.post('/transfer', async (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;

    // --- 1. Basic Validation ---
    if (!fromUserId || !toUserId || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid sender, receiver, or amount.' });
    }
    
    // --- 2. Prevent self-transfer ---
    if (fromUserId === toUserId) {
        return res.status(400).json({ message: 'Cannot transfer money to the same account.' });
    }

    try {
        // --- 3. Find both users ---
        const [sender, receiver] = await Promise.all([
            User.findById(fromUserId),
            User.findById(toUserId)
        ]);

        if (!sender) return res.status(404).json({ message: 'Sender account not found.' });
        if (!receiver) return res.status(404).json({ message: 'Receiver account not found.' });

        // --- 4. Check balance ---
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }

        // --- 5. Perform transfer ---
        sender.balance -= amount;
        await sender.save();

        receiver.balance += amount;
        await receiver.save();

        // --- 6. Success response ---
        res.status(200).json({
            message: `Transferred $${amount} from ${sender.name} to ${receiver.name}.`,
            senderBalance: sender.balance,
            receiverBalance: receiver.balance
        });

    } catch (error) {
        console.error('Transfer Error:', error);
        res.status(500).json({ message: 'An internal error occurred during transfer.' });
    }
});

// ===============================================
// --- Start Server ---
// ===============================================
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
