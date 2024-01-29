const fs = require("fs");

class MapDAO{
    constructor(pool){
        this.pool = pool
    }

    launch(req){
        return this.pool.query(req)
    }   
    
    async selectAllMap(){
        let req = fs.readFileSync("./requestSQL/map/selectAllMap.sql", 'utf8');
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

module.exports = MapDAO