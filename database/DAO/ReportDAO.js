const fs = require("fs");

class ReportDAO{
    constructor(pool){
        this.pool = pool
    }

    launch(req){
        return this.pool.query(req)
    }   
    
    async selectAllReport(){
        let req = fs.readFileSync("./requestSQL/report/selectAllReport.sql", 'utf8');
        console.log(req)
        return this.launch(req)
    }

    async selectReport(id){
        let req = fs.readFileSync("./requestSQL/report/selectReport.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async createReport(obj){
        let req = fs.readFileSync("./requestSQL/report/createReport.sql", 'utf8');
        req = this.replaceParamByValue(req, obj)
        console.log(req)
        return this.launch(req)
    }

    async deleteReport(id){
        let req = fs.readFileSync("./requestSQL/report/deleteReport.sql", 'utf8');
        req = req.replace('@@param1@@', id)
        console.log(req)
        return this.launch(req)
    }

    async ignoreReport(activities){
        let req = fs.readFileSync("./requestSQL/report/ignoreReport.sql", 'utf8');
        req = req.replace('@@param1@@', activities)
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

module.exports = ReportDAO