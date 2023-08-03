const form = document.getElementById('form')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
   weatherFunction()
   
    form.reset()
})

const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const longitudeF = document.getElementById('longitude')
const latitudeF = document.getElementById('latitude')

const weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
            latitudeF.innerText=""
            locationF.innerText=""
        }
        else {
            setTimeout(() =>{
                locationF.innerText =data.location},200)
            setTimeout(()=>{
            longitudeF.innerText=data.longitude},1000)
            setTimeout(() =>{
            latitudeF.innerText=data.latitude},1600)
           setTimeout(() =>{
            forecastF.innerText = data.forecast},2100)
           
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}