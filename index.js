require('dotenv').config()

const exp = require('express')

const cors = require('cors')
const userRoutes = require("./Routes/UserRoute");

// const router=require('./Routes/router')

require('./DB/connection')

const adminserver = exp()

adminserver.use(cors())

// middleware: it controls the request response cycle(only here)
adminserver.use(exp.json())

// adminserver.use(router)
adminserver.use("/api/user", userRoutes);


const PORT = 4500 || process.env.PORT

adminserver.listen(PORT,()=>{
    console.log(`server running successfully at ${PORT}`);
})

adminserver.get('/',(req,res)=>{
    res.send(`<h1>Server sunning successfully and client request started</h1>`)
})