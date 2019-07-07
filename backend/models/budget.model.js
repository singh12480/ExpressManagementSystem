const mongoose = require('mongoose');
const budgetSchema = mongoose.Schema({
    value: { type: Number, required: true }
});

module.exports = mongoose.model('Budget',budgetSchema);