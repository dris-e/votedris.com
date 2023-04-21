require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Vote = require('./models/Vote');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-votes', async (req, res) => {
    let vote = await Vote.findOne();
    if (!vote) {
      vote = new Vote({ count: 0 });
      await vote.save();
    }
    res.json({ count: vote.count });
  });
  
  app.post('/vote', async (req, res) => {
    let vote = await Vote.findOne();
    if (!vote) {
      vote = new Vote({ count: 0 });
      await vote.save();
    }
    vote.count++;
    await vote.save();
    res.json({ count: vote.count });
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
