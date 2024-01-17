SELECT 
    id,
    lastname,
    firstname,
    mail,
    password,
    birthdate,
    phone,
    address,
    postalcode
FROM 
    users
WHERE 
    mail = @@param1@@