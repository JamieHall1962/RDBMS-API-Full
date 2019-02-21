
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Kelli', cohort_id: 1},
        {name: 'Nathan', cohort_id: 2},
        {name: 'Estevan', cohort_id: 3},
        {name: 'Nick', cohort_id: 1},
        {name: 'Emilio', cohort_id: 2},
        {name: 'Brannan', cohort_id: 3},
        {name: 'Jamie', cohort_id: 1}
      ]);
    });
};
