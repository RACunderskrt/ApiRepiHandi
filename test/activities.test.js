const Factory = require('../database/factory.js');

test('Test insert, select, delete in Activities', async () => {
    //init the variable
    const fac = new Factory()
    const activitiesDAO = await fac.createActivitiesDAO()

    let newActivities = {
      id:-99,
      name:"activité test",
      description:"une activité très sympathique",
      start:"2024-01-18T09:00:00.000Z",
      end:"2024-01-18T11:00:00.000Z",
      id_user:2,
      capacity:2,
      address:"maison de répis",
      postalcode:"13200"
    }

    //create the Activities in the database
    await activitiesDAO.createActivities(newActivities)
    //get the object stored in the database
    let bufActivities = await activitiesDAO.selectAllActivities()
    bufActivities = bufActivities.rows
    let isContain = false
    let bufActivities2;
    
    //in the database the start and end data are in the timezone GMT, so 1 hour less than in France
    newActivities.start = new Date(newActivities.start)
    newActivities.start.setHours(newActivities.start.getHours() - 1) 

    newActivities.end = new Date(newActivities.end)
    newActivities.end.setHours(newActivities.end.getHours() - 1)

    //check si la donnée est dans la database
    for(let b of bufActivities){
      if(b.name === newActivities.name && b.description === newActivities.description && b.id_user === newActivities.id_user &&
         b.start.getTime() === newActivities.start.getTime() && b.end.getTime() === newActivities.end.getTime()
      ){
        isContain = true
        bufActivities2 = b
      }
         
    }
    console.log(bufActivities2)
    expect(isContain).toBeTruthy()

    //delete the Activities in the database
    await activitiesDAO.deleteActivities(bufActivities2.id)
    //get the object in the database
    bufActivities = await activitiesDAO.selectActivities(bufActivities2.id)
    bufActivities = bufActivities.rows[0]
    //check if it is undefined 
    expect(bufActivities).toBeUndefined();

  });