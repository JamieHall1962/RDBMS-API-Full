const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  create,
  read,
  readById,
  update,
  del
};

function create(student) {
  return db("students")
    .insert(student)
    .into("students");
}

function read() {
  return db("students");
}

function readById(id) {
  return db("students")
    .join("cohorts", "cohorts.id", "students.cohort_id")
    .select("students.id", "students.name", { cohort: "cohorts.name" })
    .where("students.cohort_id", id);
}

function update(id, changes) {
  return db("students")
    .where({ id })
    .update(changes);
}

function del(id) {
  return db("students")
    .where({ id })
    .del();
}
