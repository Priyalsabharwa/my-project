const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ Connection Error:', err));

// Routes
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
