const express = require('express')
const app = express()
const fs = require('fs')
const inventionsdb = require('./client/inventions.json')
const inventorsdb = require('./client/inventors.json')
const bodyParser = require('body-parser')
const { error } = require('console')
const urlencodedParser = bodyParser.urlencoded({extended:false})

app.use('/client',express.static('client'))
 
app.use(express.json())
app.use(express.static('body-parser'))
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname+"/views/intro.html")
})
  
app.get('/inventions',(req,res)=>{
    res.status(200).sendFile(__dirname+"/views/inventiondetails.html")
})

app.get('/inventions/add',urlencodedParser,(req,res)=>{
    res.sendFile(__dirname+"/views/new-invention.html")
})

app.get('/inventions/:id',(req,res)=>{
    var inventionID = req.params.id
    const singleinvention = inventionsdb.find(
        (invention)=>invention.id === Number(inventionID))
    if(!singleinvention){
        return res.status(404).send('Invention Does Not Exist')
    }
    return res.json(singleinvention)
})

app.get('/inventors',(req,res)=>{
    res.status(200).sendFile(__dirname+"/views/inventordetails.html")
})


app.get('/inventors/add',(req,res)=>{
    res.sendFile(__dirname+"/views/new-inventor.html")
})

app.get('/inventors/:id',(req,res)=>{
    var inventorsID = req.params.id
    const singleinventor = inventorsdb.find(
        (inventor)=>inventor.id === Number(inventorsID))
    if(!singleinventor){
        return res.status(404).send('Inventor Does Not Exist')
    }
    return res.json(singleinventor)
})

app.post('/inventions/result',(req,res)=>{
    if(!Number(req.body.id )||req.body.id < 9){
        return res.send('<h1>Please enter a number taht is bigger than 8</h1><button><a href="/inventions/add">return</a></button>')
    }
    const newInvention = {
        id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        inventor: req.body.inventor,
        brief_introduction: req.body.brief_introduction
    }
    inventionsdb.push(newInvention)
    const new0 = JSON.stringify(inventionsdb)
    fs.writeFileSync('./client/inventions.json',new0)
    res.send('<h1>Your data has been saved!</h1><h3>You can check your data by clicking <a href="/inventions">here</a>.</h3>')
})

app.post('/inventors/result',(req,res)=>{
    if(!Number(req.body.id )||req.body.id < 9){
        res.send('<h1>Please enter a number taht is bigger than 8</h1><button><a href="/inventors/add">return</a></button>')
        return error
    }
    const newInventor = {
        id: req.body.id,
        name: req.body.name,
        projects: req.body.projects,
        introduction: req.body.introduction,
    } 
    inventorsdb.push(newInventor)
    const new1 = JSON.stringify(inventorsdb)
    fs.writeFileSync('./client/inventors.json',new1)
    res.send('<h1>Your data has been saved!</h1><h3>You can check your data by clicking <a href="/inventors">here</a>.</h3>')
})


app.all('*',(req,res)=>{
    res.status(404).send('<h1>Resource Not Found</h1>')
})
 
module.exports = app
