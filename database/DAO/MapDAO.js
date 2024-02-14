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
                        obj[property] = obj[property].replaceAll("'", "''")
                    }
                        
                    req = req.replaceAll('@@'+property+'@@', `'${obj[property]}'`)
                }
                else
                    req = req.replaceAll('@@'+property+'@@', obj[property])
        }
        console.log("req :", req)
        return req
    }
}

module.exports = MapDAO