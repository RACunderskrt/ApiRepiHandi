const fs = require("fs");

class PacDAO{

    constructor(pool){
        this.pool = pool
    }

    launch(req){
        return this.pool.query(req)
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

    async selectPACByActivities(id){
        let req = fs.readFileSync("./requestSQL/map/selectPACByActivities.sql", 'utf8');
        req = req.replace('@@param1@@', id)
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
module.exports = PacDAO