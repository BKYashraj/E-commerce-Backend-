const express=require("express")
const cors=require('cors');

const app=express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  return res.send({message:"welcome to ecommerce api - node"})
})

const authRouters = require("./routes/auth.routes.js");
app.use("/auth",authRouters);

const userRouters = require("./routes/user.routes.js");
app.use("/api/user",userRouters);

module.exports={app};


// {
//   "firstName" : "Yashraj",
//   "lastName" : "Desale",
//   "email": "yashrajdesale1@gmail.com",
//   "password" : "123456789"
// }