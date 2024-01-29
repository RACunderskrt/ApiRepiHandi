SELECT 
    id,
    lastname,
    firstname,
    mail,
    password,
    birthdate,
    phone,
    address,
    postalcode,
    id_role
FROM 
    users
WHERE 
    mail = @@param1@@