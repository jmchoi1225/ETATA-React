const Service = require('./service')
const express = require('express')
const app = express()
const port = 5000

const service = new Service();

app.get('/courses', (req, res) => {
    service.getCourses()
        .then(courses => {
            console.log("got courses")
            res.json(courses)
        })
        .catch(err=>{
            res.send(err)
        })
})

app.put('/users/grouplist', (req, res)=>{
    let {userId, userGrouplist} = req.query
    
    service.updateGrouplist(userId, userGrouplist)
        .then(data => {
            console.log("updated userId ", userId,"'s grouplist to ", userGrouplist)
        })
        .catch(err=>{
            res.send(err)
        })
})

app.get('/users/grouplist', (req, res)=>{
    const {userId} = req.query


    service.getGrouplist(userId)
        .then(data=>{
            console.log("got userId ", userId, "'s grouplist")
            res.json(data)
        })
        .catch(err=>{
            res.send(err)
        })
})

app.listen(port, () => {
    console.log('listening on port: ', port)
})