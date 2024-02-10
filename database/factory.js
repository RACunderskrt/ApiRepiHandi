const { pool } = require('./db.js')
const UserDAO = require('./DAO/UserDAO.js')
const PacDAO = require('./DAO/PacDAO.js')
const ActivitiesDAO = require('./DAO/ActivitiesDAO.js')
const MapDAO = require('./DAO/MapDAO.js')
const ReportDAO = require('./DAO/ReportDAO.js')

class Factory{
    constructor(pool_ = pool){
        this.pool = pool_;
    }

    createUserDAO(){
        return new UserDAO(this.pool);
    }

    createPacDAO(){
        return new PacDAO(this.pool);
    }

    createActivitiesDAO(){
        return new ActivitiesDAO(this.pool);
    }

    createMapDAO(){
        return new MapDAO(this.pool);
    }

    createReportDAO(){
        return new ReportDAO(this.pool);
    }
}

module.exports = Factory