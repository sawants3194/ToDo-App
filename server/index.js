require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});  

 
 
const app = express();

const taskRoute = require('./router/taskRouter')
const userRoute = require('./router/userRouter')
// Configure middleware and routes
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/api/v1', taskRoute)
app.use('/api/v1', userRoute)


// Start the server
app.listen(process.env.PORT, () => {
  console.log("DB Succeed")
  console.log('Server started on 8000   ');
});
