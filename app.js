const express= require('express');
const app= express();
const port=process.env.PORT || 3000;    
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api',require("./routes/user.router"))
app.listen(port,function(err){
    if(err){ console.log("error in starting server"); return;}
    console.log("server is running on port: ", port);
}) 