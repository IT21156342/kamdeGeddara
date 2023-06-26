const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("../kandegedara-backend/config/DB");



const app = express();
dbConnection();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
//app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

app.use("*", cors());

app.use('*',
    cors()
);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.header("Access-Control-Allow-Credentials", true)
    next();
})

app.get('/', async (req, res, next) => {
    res.send({message: 'Awesome it works 🐻'});
});

app.use('/teaPowder',require('./routes/TeaPowderRoutes'));
app.use('/Salary',require('./routes/SalaryRoute'));
app.use('/sstg', require('./routes/sstgRoutes'));
app.use('/api/v1/auth', require('./routes/userRoutes'));
app.use('/sellingTeaLeaves', require('./routes/SellRoutes'));
app.use('/purchaseTeaLeaves', require('./routes/PurchaseTeaLeavesRoutes')); // purchase routes tea
app.use('/empReg', require('./routes/EmpRegRoutes'));
app.use('/empAttendance', require('./routes/EmpAttendanceRoutes'));
const vitaminRouter = require("./routes/vitamins");
const odersRouter = require("./routes/oders");
app.use("/vitamin", vitaminRouter);
app.use("/oders", odersRouter);


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));