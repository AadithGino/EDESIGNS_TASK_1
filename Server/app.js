const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();

const homeRouter = require("./Routes/router")
mongoose.connect(
    "mongodb+srv://aadith:1234@cluster0.zc9nm2l.mongodb.net/?retryWrites=true&w=majority"
  );
app.use(express.json())
app.use("/",homeRouter)




app.listen(3000,()=>{
    console.log('Server running port on http::localhost:3000');
})