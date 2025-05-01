require('dotenv').config()
const express = require('express');
const cors = require('cors')
const http = require('http')
const { json, urlencoded } = require('express')

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = 3005;


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
})
