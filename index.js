const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('./database/request')


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

//Select every users in the db
app.get('/user', (req, res) => {
    request.selectAllUser().then((request) => {
        res.send(request.rows);
    });
});

//Select the object user by their mail
app.get('/user/:mail', (req, res) => {
    request.selectUser(req.params.mail).then((request) => {
        res.send(request.rows[0]);
    });
});

//Check if the right password is given
app.post('/user/check', (req, res) => {
    request.selectUser(req.body.mail).then((request) => {
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
    request.createUser(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete the user by his id
app.delete('/user/:id', (req, res) => {
    request.deleteUser(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select every pac in the db
app.get('/pac', (req, res) => {
    request.selectAllPAC().then((request) => {
        res.send(request.rows);
    });
});

//Select the object pac by their id
app.get('/pac/:id', (req, res) => {
    request.selectPAC(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select the object pac by the id of the user fk
app.get('/pac/user/:id', (req, res) => {
    request.selectPACbyUser(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Create a new pac or modify it if the id already exist
app.post('/pac', (req, res) => {
    request.createPAC(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete the pac by his id
app.delete('/pac/:id', (req, res) => {
    request.deletePAC(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select every activities in the db
app.get('/activities', (req, res) => {
    request.selectAllActivities().then((request) => {
        res.send(request.rows);
    });
});

//Select the object activities by their id
app.get('/activities/:id', (req, res) => {
    request.selectActivities(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select the object activities by their date
app.post('/activities/date', (req, res) => {
    console.log("là,", req.body)
    request.selectActivitiesbyDay(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Create a new activities or modify it if the id already exist
app.post('/activities', (req, res) => {
    request.createActivities(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete the activities by his id
app.delete('/activities/:id', (req, res) => {
    request.deleteActivities(req.params.id).then((request) => {
        res.send(request.rows[0]);
    });
});

//Select every link between activities and pac
app.get('/map', (req, res) => {
    request.selectAllMap().then((request) => {
        res.send(request.rows);
    });
});

//Select every activities with the pac fk
app.get('/activities/pac/:id', (req, res) => {
    request.selectActivitiesByPAC(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Select every pac with the activities fk
app.get('/pac/activities/:id', (req, res) => {
    request.selectPACByActivities(req.params.id).then((request) => {
        res.send(request.rows);
    });
});

//Create a link between pac and activities
app.post('/map', (req, res) => {
    request.createMap(req.body).then((request) => {
        res.send(request.rows);
    });
});

//Delete a link between pac and activities
app.delete('/map', (req, res) => {
    request.deleteMap(req.body).then((request) => {
        res.send(request.rows);
    });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);

});