const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const connectDb = require('./configs/connectDb')

//config dot env file
dotenv.config();


//databasecall
connectDb();
//rest object
const app = express();

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//user routes
app.use('/api/v1/user', require('./routes/userRoute'))


//port
const PORT = process.env.PORT || 8081;
//transection routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'));


//static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})


//listen
app.listen(PORT, () => {
    console.log(`Server running on post ${PORT}`)
});
