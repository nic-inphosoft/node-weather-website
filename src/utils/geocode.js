const request = require('request')

const geocode = (address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+ '.json?access_token=pk.eyJ1IjoibGVyb2lpaTY5IiwiYSI6ImNreTFiMXQwODA5ZDMycGxhcHg3OHF1amgifQ.5pYyd8UwquepNPp7Kt0q5g&limit=1'


    request({ url: url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to service location!', undefined)
        }else if(body.features.length === 0){//didnt get in search result
            callback('Unable to find location. Try another search!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode