import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";

env.config();
const app=express();
const port=3000;
const API_URL="https:api.agify.io?";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/",async(req,res)=>{
    console.log(req.body);
    let name=req.body.name;
    let cID=req.body.countryID;
    let country='';
    if(cID.length!=0){
        country="&country_id="+cID;
    }
    try{
        const response=await axios.get(API_URL+"name="+name+country);
        console.log(response.data);
        res.render("index.ejs",{
            name:response.data.name,
            age:response.data.age,
        
        })
    }
    catch(error){
        console.log(error.response.message);
    }
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});