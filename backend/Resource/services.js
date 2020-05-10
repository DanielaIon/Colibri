const {
    query
} = require('../data');

const add = async (name,
                   details) => {
    await query('INSERT INTO resource (name, details) VALUES ($1, $2)', [name, details]);
};

const getAll = async () => {
    return await query('SELECT * FROM resource');
};

const getById = async (id) => {
    return await query('SELECT * FROM resource WHERE id = $1', [id]);
};

const getByName = async (name) => {
    return await query('SELECT * FROM resource WHERE name = $1', [name]);
};

const updateById = async (id,
                            name,
                            details) => {
    await query('UPDATE resource SET name = $1, details = $2  WHERE id = $3', [name, details, id]);
};

const deleteById = async (id) => {
    await query('DELETE FROM resource WHERE id = $1', [id]);
};

module.exports = {
    add,
    getAll,
    getById,
    getByName,
    updateById,
    deleteById
}