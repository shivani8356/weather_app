const express = require('express')
const app = express();
const axios = require('axios');
// const bodyparser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({extended : true}))


app.get('/' , (req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post('/' , async (req,res)=>{
        try{
             const api_key = '5ef45d9307bd7d93a9b21e8e6a41f5fe'
             const city = req.body.City_Name;
             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
             const response = await axios.get(url);
             const temperature = await (response.data.main.temp);
             console.log(response.data)
             res.status(200).send(`The temperature in ${city} is ${temperature} degree celsius`);
           } catch (error) {
             res.status(400).json({
               status: "error",
               message: "Failed to fetch weather data"
             });
           }
         }
);


const port = 1000;
app.listen(port , ()=>{console.log("listening on port - 1000")});