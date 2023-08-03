

const express = require('express')
const app =express()
const port = process.env.PORT || 3000
const path = require("path")
const publicDirectoryPath =path.join(__dirname , '../public')
app.use(express.static(publicDirectoryPath))

//hbs//
const hbs=require('hbs')
app.set('view engine', 'hbs')
const viewsDirectory=path.join(__dirname,"../temp1/views")
app.set("views" , viewsDirectory)

const partialsPath = path.join (__dirname , "../temp1/partials")
hbs.registerPartials(partialsPath)

app.get('/', (req,res) => {
  res.render("index",{
    title:"home",
    desc:" welecome this is home page"
  })
})
  
app.get('/header', (req,res) => {
  res.render("header",{
    title:"header",
  
  })
})
//////////
const geocode  =require('./data1.js/geocode')
const  forecast = require('./data1.js/forecast')
app.get('/weather', (req,res) => {
  if (!req.query.address){
    return res.send({
      error:'error your must enter address'
    })
  }
  geocode(req.query.address ,(error,data)=>{
    if (error){
      return res.send({error})
    }
    else{
  forecast(data.latitude,data.longitude,(error,forecastData)=>{
    if (error){
      return res.send({error})
    }
    else{
     res.send({
      forecast:forecastData,
      location:req.query.address,
      latitude:data.latitude,
      longitude:data.longitude
     })
    }
    })
  }
  })
  })





app.get('*', (req,res) =>{
  res.send("404 page not found")
}
)


app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})
