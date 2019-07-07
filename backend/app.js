const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routers
const ExpenseRoutes = require('./routes/expense.route');
const BudgetRoutes = require('./routes/budget.route');
const CategoryRoutes = require('./routes/category.routes');
const UserRoutes = require('./routes/user.routes');

// connection to the database
mongoose
  .connect(
    "mongodb://localhost:27017/EMS"
  )
  .then(() => {
    console.log("Connected to EXPRESS MANAGEMENT database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// import schemas
const Category = require('./models/category.model');


const User = require('./models/user');

// CORS MIDDLEWARE ...
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

// BODY-PARSER ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log('first middleware');
    next();
});




// expense routes
app.use('/api/expense',ExpenseRoutes);

// budget routes
app.use('/api/budget', BudgetRoutes);

// category routes
app.use('/api/category', CategoryRoutes)

// user routes
app.use('/api', UserRoutes)

module.exports = app;