const {
    query
} = require('../data');

const add = async (question) => {
    await query('INSERT INTO question (question,answer,visible) VALUES ($1,$2,$3)', [question,"-","false"]);
};

const getAll = async () => {
    return await query('SELECT * FROM question');
};

const getById = async (id) => {
    return await query('SELECT * FROM question WHERE id = $1', [id]);
};

const updateById = async (id,answer) => {
    await query('UPDATE question SET answer = $1, visible = $2  WHERE id = $3', [answer,"true", id]);
};

const deleteById = async (id) => {
    await query('DELETE FROM question WHERE id = $1', [id]);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
}