const Factory = require('../database/factory.js');

test('Test insert, select, delete in PAC', async () => {
    //init the variable
    const fac = new Factory()
    const pacDAO = await fac.createPacDAO()

    let newPac = {
      id:-99,
      lastname:"jeremy",
      firstname:"dorlo",
      description:"Transformers est son film préféré.",
      birthdate:"2004-08-11",
      clean:true,
      mobility:true,
      talk:true,
      blind:false,
      epilepsy:false,
      deaf:false,
      id_user: 5
    }
    //create the Pac in the database
    await pacDAO.createPAC(newPac)
    //get the object stored in the database
    let bufPac = await pacDAO.selectAllPAC()
    bufPac = bufPac.rows
    let isContain = false
    let bufPac2;

    //check si la donnée est dans la database
    for(let b of bufPac){
      if(b.lastname === newPac.lastname && b.description === newPac.description && b.id_user === newPac.id_user &&
         b.firstname === newPac.firstname
      ){
        isContain = true
        bufPac2 = b
      }
         
    }
    expect(isContain).toBeTruthy()

    //delete the Pac in the database
    await pacDAO.deletePAC(bufPac2.id)
    //get the object in the database
    bufPac = await pacDAO.selectPAC(bufPac2.id)
    bufPac = bufPac.rows[0]
    //check if it is undefined 
    expect(bufPac).toBeUndefined();

  });