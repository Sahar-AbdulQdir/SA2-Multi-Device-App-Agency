// mongodb+srv://saharkasir27:<db_password>@cluster1.1957l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1

const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/item.js')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.get('/',async (req, res) => {
    const response = await itemModel.find()
    return res.json({items : response})
})

app.listen(3002, () => {
    console.log('Server is running on port 3002');
})


// Gracefully handle termination signals to free up the port
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    process.exit(0);
  });
  
  


