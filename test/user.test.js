const Factory = require('../database/factory.js');

test('Test insert, select, delete in User', async () => {
    //init the variable
    const fac = new Factory()
    const userDAO = await fac.createUserDAO()

    let newUser = {
      id:-99,
      lastname:"Doe",
      firstname:"John",
      mail:"john.doe@gmail.com",
      password:"imMissing",
      birthdate:"2001-01-02",
      phone:"123456789",
      address:"0 rue de nulle part",
      postalcode:"13200",
      id_role:2
    }

    //create the user in the database
    await userDAO.createUser(newUser)
    //get the object stored in the database
    let bufUser = await userDAO.selectUser("john.doe@gmail.com")
    bufUser = bufUser.rows[0]
    //store the id to test the delete
    let bufID = bufUser.id
    //change the birthdate to a string to compare them
    bufUser.birthdate = bufUser.birthdate.toISOString().substring(0, 10)

    //delete the id beacause they must be different
    delete newUser.id
    delete bufUser.id

    //check if this is the same object
    expect(newUser).toEqual(bufUser);
    //delete the user in the database
    await userDAO.deleteUser(bufID)
    //get the object in the database
    bufUser = await userDAO.selectUser("john.doe@gmail.com")
    bufUser = bufUser.rows[0]
    //check if it is undefined 
    expect(bufUser).toBeUndefined();

  });