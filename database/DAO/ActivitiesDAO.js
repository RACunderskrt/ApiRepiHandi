const fs = require("fs");

class ActivitiesDAO{
    constructor(pool){
        this.pool = pool
    }

    launch(req){
        return this.pool.query(req)
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

    async selectMaxID(){
        let req = fs.readFileSync("./requestSQL/activities/selectMaxID.sql", 'utf8');
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
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async selectActivitiesByPAC(id){
        let req = fs.readFileSync("./requestSQL/map/selectActivitiesByPAC.sql", 'utf8');
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

module.exports = ActivitiesDAO