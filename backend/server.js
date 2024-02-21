const express = require('express');
const { urlencoded } = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { disconnectFromMongoDB } = require('./connect/db');
const adminRoutes = require('./routes/adminRoutes');
const stadeOwnerRoutes = require('./routes/stadeOwnerRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(urlencoded({extended:true}))
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Add your Express routes and middleware here
app.use('/api', stadeOwnerRoutes);
app.use('/api', adminRoutes);

// Add your Express routes and middleware here
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close MongoDB connection when the app is closed
process.on('SIGINT', () => {
  disconnectFromMongoDB()
    .then(() => {
      console.log('Disconnected from MongoDB. Closing server...');
      server.close();
    })
    .catch((error) => {
      console.error('Error disconnecting from MongoDB:', error);
      process.exit(1);
    });
});