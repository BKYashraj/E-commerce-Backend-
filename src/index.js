const express=require("express")
const cors=require('cors');

const app=express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  return res.send({message:"welcome to ecommerce api - node"})
})

module.exports={app};