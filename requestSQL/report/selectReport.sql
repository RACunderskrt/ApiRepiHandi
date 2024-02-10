SELECT
    id,
    id_activities,
    done,
    id_user
FROM
    report 
WHERE id = @@param1@@