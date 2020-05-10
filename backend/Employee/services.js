const {
    query
} = require('../data');

const {
    generateToken,
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const register = async (password,
                    firstName ,
                    lastName ,
                    email ,
                    department ,
                    position ,
                    role ) => {
    //cripteaza parola
    let myPassword = await hash(password);

    await query('INSERT INTO employee (password, firstName, lastName, email, department, position, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', [myPassword, firstName, lastName, email, department, position, role]);
};

const updateRoleById = async (id, role) => {
    await query('UPDATE employee SET role = $1 WHERE id = $2', [role, id]);
};


const authenticate = async (email, password) => {
    const result = await query(`SELECT id, password, role FROM employee u 
                                WHERE u.email = $1`, [email]);

    if (result.length === 0) {
        throw new ServerError(`Utilizatorul cu emailul ${email} nu exista in sistem!`, 400);
    }
    const user = result[0];
    
    // pas 1: verifica daca parola este buna (hint: functia compare)
    let checkPasswd = await compare(password, user.password);

    // pas 1.1.: compare returneaza true sau false. Daca parola nu e buna, arunca eroare
    if (checkPasswd === false) {
        throw new ServerError(`Parola pentru utilizatorul ${email} nu este ok!`, 400);
    }

    // pas 2: genereaza token cu payload-ul: {userId si userRole}
    let generatedToken = await generateToken({"userId":user.id, "userRole":user.role});

    // pas 3: returneaza token
    return generatedToken;
};

const getEmployees = async() => {
    return await query('SELECT * FROM employee');
};
const getEmployeeById = async (id) => {
    return await query('SELECT * FROM employee WHERE id = $1', [id]);
};

const deleteById = async (id) => {
    await query('DELETE FROM employee WHERE id = $1', [id]);
};

module.exports = {
    register,
    updateRoleById,
    authenticate,
    getEmployees,
    getEmployeeById,
    deleteById
}