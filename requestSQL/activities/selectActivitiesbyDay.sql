SELECT 
    id, 
    name, 
    description, 
    start, 
    "end",
    id_user, 
    capacity, 
    address, 
    postalcode,
    request
FROM activities
WHERE start between @@param1@@ and @@param2@@