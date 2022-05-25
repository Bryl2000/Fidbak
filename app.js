const express = require('express');
// const path = require('path');
const tasks = require('./routes/auth.js')
const app = express();
require('dotenv').config()


const connectDB = require('./db/connect');
const authenticateUser = require('./controllers/middleware/authentication')


//routers
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')

// error handler
const errorHandlerMiddleware = require('./controllers/middleware/error-handler')

//middleware

app.use(express.json());
app.set('port', process.env.PORT || 3000);

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/task', taskRouter);

 


// app.use('/', require('./routes/web'));
// app.use('/api', require('./routes/api'));

    //npm install --save-dev nodemon

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }   catch (error) {
        console.log(error)
    }
}
    
start()