
const request = require ('request')

const geocode = (address , callback) => {
    const geocodeUrl = ' https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiaGFpZmEtOTkyIiwiYSI6ImNsa2sxaWt4aTExdW4zY2tnZnhiNzRoZmEifQ.HgDpKbaJib838bknPg3OsA'
    
    request ({url : geocodeUrl , json : true} , (error , response) => {
        if (error) {
            callback ("nable to connect geocode Service" , undefined)
        }
        else if (response.body.message) {
            callback (response.body.message , undefined)
        }
        else if (response.body.features.length == 0){
             callback ("Unable to find location"  , undefined)
        } 
        else {
            callback (undefined , {
                 longitude :  response.body.features[0].center[1] ,
                 latitude : response.body.features[0].center[0]
            } )
        }
    } )
    }

    module.exports = geocode;
