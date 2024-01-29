SELECT
    report.id,
    report.id_activities,
    activities.name,
    activities.description,
    activities.start,
    activities."end",
    activities.id_user AS id_user_reported,
    activities.capacity,
    activities.address,
    activities.postalcode,
    report.done,
    report.id_user,
    users.lastname,
    users.firstname
FROM
    report
INNER JOIN 
    activities
    ON report.id_activities = activities.id
INNER JOIN
    users
    ON report.id_user = users.id
    
WHERE done = false