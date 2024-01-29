//const { pool } = require('./db.js')
const { pool } = require('./dbLocal.js')
const fs = require("fs");

class request{
    constructor(nom){
        nom = nom;
    }

    async launch(req){
        return pool.query(req)
    }
    
    //Replace the parameter inside a sql request by the right value 
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

    async selectAllPAC(){
        let req = fs.readFileSync("./requestSQL/pac/selectAllPAC.sql", 'utf8');
        console.log(req)
        return this.launch(req)
    }

    async selectPAC(id){
        let req = fs.readFileSync("./requestSQL/pac/selectPAC.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async selectPACbyUser(idUser){
        let req = fs.readFileSync("./requestSQL/pac/selectPACbyUser.sql", 'utf8');
        req = req.replace('@@param1@@', idUser)
        console.log(req)
        return this.launch(req)
    }

    async createPAC(obj){
        let req = fs.readFileSync("./requestSQL/pac/createPAC.sql", 'utf8');
        req = this.replaceParamByValue(req, obj)
        console.log(req)
        return this.launch(req)
    }

    async deletePAC(id){
        let req = fs.readFileSync("./requestSQL/pac/deletePAC.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async selectAllActivities(){
        let req = fs.readFileSync("./requestSQL/activities/selectAllActivities.sql", 'utf8');
        console.log(req)
        return this.launch(req)
    }

    async selectActivities(id){
        let req = fs.readFileSync("./requestSQL/activities/selectActivities.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async selectActivitiesbyDay(obj){
        let req = fs.readFileSync("./requestSQL/activities/selectActivitiesbyDay.sql", 'utf8');
        let date = new Date(obj.date)
        var nextDay = new Date(date)
        nextDay.setDate(date.getDate()+1)
        req = req.replace('@@param1@@', `'${date.toISOString()}'`)
        req = req.replace('@@param2@@', `'${nextDay.toISOString()}'`)
        console.log(req)
        return this.launch(req)
    }

    async createActivities(obj){
        let req = fs.readFileSync("./requestSQL/activities/createActivities.sql", 'utf8');
        req = this.replaceParamByValue(req, obj)
        console.log(req)
        return this.launch(req)
    }

    async deleteActivities(id){
        let req = fs.readFileSync("./requestSQL/activities/deleteActivities.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async selectAllMap(){
        let req = fs.readFileSync("./requestSQL/map/selectAllMap.sql", 'utf8');
        console.log(req)
        return this.launch(req)
    }

    async selectActivitiesByPAC(id){
        let req = fs.readFileSync("./requestSQL/map/selectActivitiesByPAC.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async selectPACByActivities(id){
        let req = fs.readFileSync("./requestSQL/map/selectPACByActivities.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async createMap(obj){
        let req = fs.readFileSync("./requestSQL/map/createMap.sql", 'utf8');
        req = this.replaceParamByValue(req, obj)
        console.log(req)
        return this.launch(req)
    }

    async deleteMap(obj){
        let req = fs.readFileSync("./requestSQL/map/deleteMap.sql", 'utf8');
        req = this.replaceParamByValue(req, obj)
        console.log(req)
        return this.launch(req)
    } 

}

module.exports = new request('db');

