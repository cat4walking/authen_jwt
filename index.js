const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require("./api/config/routes/user.routes");
const connection = require("./api/config/database");
// const session = require('express-session');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', userRouter);
// app.use(session({
//     secret : process.env.SESSION_SECRET,
//     resave : true,
//     saveUninitialized : true
// }));

app.listen(process.env.PORT || 3000 , () => {
    console.log(`sever runing on: http://localhost:${process.env.PORT}`);
});

