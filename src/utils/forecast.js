const request = require('request')

const forecast = (lat,long, callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=e8bfb47c22fc76e8c3dd9261814af7a7&query='+ lat + ','+ long +'&units=f '


    request({ url: url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to service location!', undefined)
        }else if(body.error){//didnt get in search result
            callback('Unable to find location. Try another search!', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + 
                '. The current temperature is '+ body.current.temperature + ' and there is a precipitation chance of '+
                body.current.precip + '.')
        }
    })
}

module.exports = forecast