const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  create,
  read,
  readById,
  update,
  del,
  searchByCohort
};

function create(cohort) {
  return db("cohorts")
    .insert(cohort)
    .into("cohorts");
}

function read() {
  return db("cohorts");
}

function readById(id) {
  return db("cohorts")
    .where({ id })
    .first();
}

function update(id, changes) {
  return db("cohorts")
    .where({ id })
    .update(changes);
}

function del(id) {
  return db("cohorts")
    .where({ id })
    .del();
}

function searchByCohort(cohort_id) {
  return db("students").where({ cohort_id });
}
