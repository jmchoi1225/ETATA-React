const Repository = require('./repository')

class Service{
    constructor(){
        this.repository = new Repository()
    }

    getCourses() {
        return new Promise ((resolve, reject) => {
            this.repository.getCourses()
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    }

    updateGrouplist(userId, userGrouplist){
        return new Promise (userId, userGrouplist, (resolve, reject) => {
            this.repository.updateGrouplist(userId, userGrouplist)
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    }

    getGrouplist(userId){
        console.log("service get grouplist")
        return new Promise ((resolve, reject) => {
            this.repository.getGrouplist(userId)
                .then(grouplist=>{
                    console.log("service", grouplist)
                    resolve(grouplist)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    }
}

module.exports = Service