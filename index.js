const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Factory = require('./database/factory.js');


const fac = new Factory()
const userDAO = fac.createUserDAO()
const pacDAO = fac.createPacDAO()
const actDAO = fac.createActivitiesDAO()
const mapDAO = fac.createMapDAO()
const reportDAO = fac.createReportDAO()

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: "Bienvenue sur l'API de répiHandi!"
    });
});

//Select every users in the db
app.get('/user', (req, res) => {
    userDAO.selectAllUser().then((request) => {
        res.send(request.rows);
    });
});

//Select the object user by their mail
app.get('/user/:mail', (req, res) => {
    userDAO.selectUser(req.params.mail).then((request) => {
        res.send(request.rows[0]);
    });
});

//Check if the right password is given
app.post('/user/check', (req, res) => {
    userDAO.selectUser(req.body.mail).then((request) => {
        newObj = request.rows[0]
        if(newObj !== undefined && newObj.password === req.body.password){
            delete newObj.password
            res.status(200).send({connect: true, object : newObj})
        }
        else
            res.status(401).send({error: "Can't connect to an account", connect: false})
    });
});

//Create a new user or modify it if the id already exist
app.post('/user', (req, res) => {
    userDAO.createUser(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete the user by his id
app.delete('/user/:id', (req, res) => {
    userDAO.deleteUser(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select every pac in the db
app.get('/pac', (req, res) => {
    pacDAO.selectAllPAC().then((request) => {
        res.send(request.rows);
    });
});

//Select the object pac by their id
app.get('/pac/:id', (req, res) => {
    pacDAO.selectPAC(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select the object pac by the id of the user fk
app.get('/pac/user/:id', (req, res) => {
    pacDAO.selectPACbyUser(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Create a new pac or modify it if the id already exist
app.post('/pac', (req, res) => {
    pacDAO.createPAC(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete the pac by his id
app.delete('/pac/:id', (req, res) => {
    pacDAO.deletePAC(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select every activities in the db
app.get('/activities', (req, res) => {
    actDAO.selectAllActivities().then((request) => {
        res.send(request.rows);
    });
});

//Select the object activities by their id
app.get('/activities/:id', (req, res) => {
    actDAO.selectActivities(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select the object activities by their date
app.post('/activities/date', (req, res) => {
    console.log("là,", req.body)
    actDAO.selectActivitiesbyDay(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Create a new activities or modify it if the id already exist
app.post('/activities', (req, res) => {
    actDAO.createActivities(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete the activities by his id
app.delete('/activities/:id', (req, res) => {
    actDAO.deleteActivities(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select every link between activities and pac
app.get('/map', (req, res) => {
    mapDAO.selectAllMap().then((request) => {
        res.send(request.rows);
    });
});

//Select every activities with the pac fk
app.get('/activities/pac/:id', (req, res) => {
    actDAO.selectActivitiesByPAC(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Select every pac with the activities fk
app.get('/pac/activities/:id', (req, res) => {
    pacDAO.selectPACByActivities(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Create a link between pac and activities
app.post('/map', (req, res) => {
    mapDAO.createMap(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete a link between pac and activities
app.delete('/map', (req, res) => {
    mapDAO.deleteMap(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Select every report in the db
app.get('/report', (req, res) => {
    reportDAO.selectAllReport().then((request) => {
        res.send(request.rows);
    });
});

//Create a new report or modify it if the id already exist
app.post('/report', (req, res) => {
    reportDAO.createReport(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Set to done every report link to the activities
app.post('/report/ignore/:id', (req, res) => {
    reportDAO.ignoreReport(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Delete the report by his id
app.delete('/report/:id', (req, res) => {
    reportDAO.deleteReport(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);

});
