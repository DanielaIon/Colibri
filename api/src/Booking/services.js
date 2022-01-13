const {
    query
} = require('../data');

const add = async (idResource,
                    idEmployee,
                    day ,
                    startHour,
                    endHour ,
                    details) => {
    await query('INSERT INTO booking (idResource, idEmployee, day , startHour, endHour , details) VALUES ($1, $2, $3, $4, $5, $6)', [idResource, idEmployee, day , startHour, endHour , details]);
};

const getAll = async () => {
    // return await query('SELECT *  FROM booking ');
    return await query('SELECT b.id as id, r.name as idresource, e.email as idemployee, TO_CHAR(b.day , \'dd/mm/yyyy\') as day, b.startHour as starthour, b.endHour as endhour, b.details as details  FROM booking b, employee e, resource r WHERE (e.id = b.idEmployee AND b.idResource = r.id)');
};

const getById = async (id) => {
    return await query('SELECT * FROM booking WHERE id = $1', [id]);
};

const getByResourceId = async (idResource, day) => {    
    return await query('SELECT b.id as id, r.name as idresource, e.email as idemployee, TO_CHAR(b.day , \'dd/mm/yyyy\') as day, b.startHour as starthour, b.endHour as endhour, b.details as details  FROM booking b, employee e, resource r WHERE ((b.idResource = $1 AND r.id = $1) AND e.id = b.idEmployee)  AND (to_char(b.day, \'YYYY-MM-DD\')  like $2)  ORDER BY b.startHour', [idResource,day]);
};

const getByEmployeeId = async (idEmployee) => {
    return await query('SELECT b.id as id, r.name as idresource, e.email as idemployee, TO_CHAR(b.day , \'dd/mm/yyyy\') as day, b.startHour as starthour, b.endHour as endhour, b.details as details  FROM booking b, employee e, resource r WHERE ((b.idEmployee = $1 AND e.id = b.idEmployee) AND (b.idResource = r.id) )', [idEmployee]);
};


const updateById = async (id,
                            idResource,
                            idEmployee,
                            day ,
                            startHour,
                            endHour ,
                            details) => {
    await query('UPDATE books SET idResource = $1, idEmployee = $2, day = $3 , startHour = $4, endHour = $5 , details = $6  WHERE id = $7', [idResource, idEmployee, day , startHour, endHour , details, id]);
};

const deleteById = async (id) => {
    await query('DELETE FROM booking WHERE id = $1', [id]);
};

module.exports = {
    add,
    getAll,
    getById,
    getByResourceId,
    getByEmployeeId,
    updateById,
    deleteById
}