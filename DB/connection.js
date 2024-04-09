const mongoose =require('mongoose')

const con_string = process.env.connection

mongoose.connect(con_string).then(()=>{
    console.log('mongoDB connected successfully');
}).catch((err)=>{
    console.log('mongoDB connection failed due to : ',err);
})