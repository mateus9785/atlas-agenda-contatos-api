require('dotenv/config');
require('express-async-errors');

const express = require('express');
var helmet = require('helmet')
const cors = require('cors');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({extended: true}));
    this.server.use(cors(), (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
      next();
    });
    this.server.use(express.static("src/public"))
    this.server.use(helmet())
  }

  routes() {
    const { server } = this;
    var normalizedPath = require("path").join(__dirname, "./app/routes");

    require("fs").readdirSync(normalizedPath).forEach(function(file) {
      const route = require("./app/routes/" + file);
      server.use(route);
    });
  }
}

module.exports = new App().server;
