SELECT 
    id,
    lastname,
    firstname,
    description,
    birthdate,
    clean,
    mobility,
    talk,
    blind,
    epilepsy,
    deaf
FROM 
    pac
WHERE 
    id = @@param1@@