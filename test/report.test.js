const Factory = require('../database/factory.js');

test('Test insert, select, delete in Report', async () => {
    //init the variable
    const fac = new Factory()
    const pacDAO = await fac.createReportDAO()

    let newReport = {
      id:-99,
      id_activities: 5,
      done: false,
      id_user: 2
    }
    //create the Report in the database
    await pacDAO.createReport(newReport)
    //get the object stored in the database
    let bufReport = await pacDAO.selectAllReport()
    bufReport = bufReport.rows
    let isContain = false
    let bufReport2;

    //check si la donnée est dans la database
    for(let b of bufReport){
      if(b.id_activities === newReport.id_activities && b.done === newReport.done && b.id_user === newReport.id_user){
        isContain = true
        bufReport2 = b
      }
         
    }
    expect(isContain).toBeTruthy()

    //delete the Report in the database
    await pacDAO.deleteReport(bufReport2.id)
    //get the object in the database
    bufReport = await pacDAO.selectReport(bufReport2.id)
    bufReport = bufReport.rows[0]
    //check if it is undefined 
    expect(bufReport).toBeUndefined();

  });