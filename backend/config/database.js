const { Sequelize } = require('sequelize');

const sequelize = process.env.MYSQL_URL
    /* Railway injecte MYSQL_URL automatiquement */
    ? new Sequelize(process.env.MYSQL_URL, {
        dialect: 'mysql',
        logging: false
    })
    /*  Fallback pour le dev local avec Docker */
    : new Sequelize(
        process.env.MYSQL_DATABASE,
        'root',
        process.env.MYSQL_ROOT_PASSWORD,
        {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dialect: 'mysql',
            logging: false
        }
    );

module.exports = sequelize;