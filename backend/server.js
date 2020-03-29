const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 5000

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'981225',
    database:'etata'
})

connection.connect((err)=>{
    if(err) console.log(err);
    else console.log("connected to database")
})

app.get('/getCourses', (req, res) => {
    connection.query('SELECT * FROM etata.course;', (err,data)=>{
        if(err) res.send(err)
        else res.json(data)
    })
})

app.listen(port, () => {
    console.log('listening on port: ', port)
})