let { init, exec, sql, transaction } = require('mysqls');

init({
    host: 'localhost',
    user: 'root',
    password:'password',
    database: 'timetabler',
    port: 3306,
    connectionLimit: 20,
});

module.exports = {
    sql, exec, transaction
}