const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3333;

app.use(cors());

// Connect to DB
connectDB();


// Init Middleware
app.use(express.json({extends: false}));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, console.log(`Sever has started on PORT ${PORT}`));