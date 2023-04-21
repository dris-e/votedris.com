const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  count: Number
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
