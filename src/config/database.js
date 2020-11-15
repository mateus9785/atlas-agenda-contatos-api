require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
    freezeTableName: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: "-03:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
};
