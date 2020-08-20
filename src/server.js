const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Hello from Nodemon');
})

app.listen(PORT, ()=>{
console.log(`Listening on ${PORT}`)
})