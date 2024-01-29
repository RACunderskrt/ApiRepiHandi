const fs = require("fs");

class UserDAO{
    constructor(pool){
        this.pool = pool
    }

    launch(req){
        return this.pool.query(req)
    }

    async selectAllUser(){
        let req = fs.readFileSync("./requestSQL/user/selectAllUser.sql", 'utf8');
        console.log(req)
        return this.launch(req)
    }

    async selectUser(mail){
        let req = fs.readFileSync("./requestSQL/user/selectUser.sql", 'utf8');
        req = req.replace('@@param1@@', `'${mail}'`)
        console.log(req)
        return this.launch(req)
    }

    async createUser(obj){
        let req = fs.readFileSync("./requestSQL/user/createUser.sql", 'utf8');
        req = this.replaceParamByValue(req, obj)
        console.log(req)
        return this.launch(req)
    }

    async deleteUser(id){
        let req = fs.readFileSync("./requestSQL/user/deleteUser.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    replaceParamByValue(req, obj){
        for(const property in obj){
            while(req.includes('@@'+property+'@@'))
                if(isNaN(obj[property])){
                    if(obj[property].includes("'")){
                        obj[property] = this.replaceQuote(obj[property])
                    }
                        
                    req = req.replace('@@'+property+'@@', `'${obj[property]}'`)
                }
                else
                    req = req.replace('@@'+property+'@@', obj[property])
        }
        console.log("req :", req)
        return req
    }

    //Replace every ' by \' to avoid any error in the db
    replaceQuote(str){
        let res = ""
        for(let char of str)
            char === "'" ? res+= "\'" : res+= char
        return res
    }
}

module.exports = UserDAO