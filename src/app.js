const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
const app = express()
//define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Ándrew Mead'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Ándrew Mead'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'This is a page to help you',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products : []
    })
})


app.get('/weather',(req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
     
    geocode(req.query.address, (error, {latitude,longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude , (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ándrew Mead',
        errormessage:'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Ándrew Mead',
        errormessage:'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

