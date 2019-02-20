const express = require("express");
const helmet = require("helmet");

const cohortsRoutes = require("./cohorts/router");
const studentsRoutes = require("./students/router");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/cohorts", cohortsRoutes);
server.use("/api/students", studentsRoutes);

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});