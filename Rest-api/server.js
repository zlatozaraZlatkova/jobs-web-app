const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error:', err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});