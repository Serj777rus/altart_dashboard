require('dotenv').config()
const express = require('express');
const cors = require('cors')
const http = require('http')
const { json, urlencoded } = require('express')
const sequelize = require('./configs/database')

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('uploads'))

const PORT = process.env.PORT || 3005;

try {
  const conn = sequelize.authenticate()
  if (conn) {
    sequelize.sync({alter: true}).then(() => {
      console.log(`Таблицы синхронезированы`)
    })
  }
} catch (error) {
  console.error(error)
}

const server = http.createServer(app);

const createUser = require('./routes/createUser');
const login = require('./routes/login');
const automaticAuth = require('./routes/automaticAuth');

app.use('/createUser', createUser)
app.use('/login', login)
app.use('/autoAuth', automaticAuth)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
})
