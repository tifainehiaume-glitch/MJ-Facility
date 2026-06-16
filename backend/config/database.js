const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    'root',
    process.env.MYSQL_ROOT_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        logging: false,
        retry: {
            max: 10,
            timeout: 3000
        }
    }
);

module.exports = sequelize;