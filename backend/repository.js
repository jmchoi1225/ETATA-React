const mysql = require('mysql')

class Repository{
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user:'root',
            password:'981225',
            database:'etata'
        })
        this.connection.connect((err)=>{
            if(err) console.log(err);
            else console.log("connected to database")
        })
    }

    getCourses(){
        return new Promise((resolve, reject)=>{
            this.connection.query('SELECT * FROM etata.course;', (err,data)=>{
                if(err) return reject(err)
                else resolve(data)
            })
        })
    }

    updateGrouplist(userId, userGrouplist){
        if(!userGrouplist) userGrouplist = 'null'
        else userGrouplist = '[' + userGrouplist + ']'

        return new Promise((resolve, reject)=>{
            this.connection.query("UPDATE etata.user SET userGroups = '" + userGrouplist + "' WHERE userId = " + userId, (err, data)=>{
                if(err) return reject(err)
                else resolve(data)
            })
        })
    }

    getGrouplist(userId){
        return new Promise((resolve, reject)=>{
            this.connection.query('SELECT userGroups FROM etata.user WHERE userId = '+ userId, (err,data)=>{
                if(err) return reject(err)
                else resolve(JSON.parse(data[0].userGroups))
            })
        })
    }
}

module.exports = Repository