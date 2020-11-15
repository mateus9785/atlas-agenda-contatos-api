const port = process.env.PORT;
const app = require('./index.js');
const { sequelize } = require("./app/models");

const databaseMongo = require('./config/mongoose');
databaseMongo(process.env.MONGO_CONECTION);

sequelize.authenticate()
  .then(() => {
    console.log('Aplicação conectada ao banco de dados.');
  })
  .catch(err => {
    console.error('Incapaz de se conectar ao banco de dados:', err);
  });

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
