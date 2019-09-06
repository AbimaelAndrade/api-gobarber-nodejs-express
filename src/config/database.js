require('dotenv').config();

module.exports = {
  dialect: process.env.BD_DIALECT,
  host: process.env.BD_HOST,
  username: process.env.BD_USER,
  password: process.env.BD_PASS,
  database: process.env.BD_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
