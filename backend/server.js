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

app.get('/courses', (req, res) => {
    connection.query('SELECT * FROM etata.course;', (err,data)=>{
        console.log("getting course list")
        if(err) res.send(err)
        else res.json(data)
    })
})

app.put('/users/grouplist', (req, res)=>{
    let {userId, userGrouplist} = req.query
    if(!userGrouplist) userGrouplist = 'null'
    else userGrouplist = '[' + userGrouplist + ']'
    
    connection.query("UPDATE etata.user SET userGroups = '" + userGrouplist + "' WHERE userId = " + userId, (err, data)=>{
        console.log("updating user ", userId, " groups to ", userGrouplist)
        if(err) {
            console.log("got error : ", err)
            res.send(err)
        }
        else {
            console.log("got results data: ",data)
            res.json(data)
        }
        
    })
})

app.get('/users/grouplist', (req, res)=>{
    const {userId} = req.query
    connection.query('SELECT userGroups FROM etata.user WHERE userId = '+ userId, (err,data)=>{
        if(err) res.send(err)
        else {
            console.log("got user ", userId, " grouplist : ", JSON.parse(JSON.stringify(data))[0].userGroups)
            res.send(JSON.parse(JSON.stringify(data))[0].userGroups)
        }
    })
})

app.listen(port, () => {
    console.log('listening on port: ', port)
})