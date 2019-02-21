const express = require("express");

const cohorts = require("./cohortsModel");
const students = require("./cohortsModel");

const router = express.Router();

// The C in CRUD

router.post("/", (req, res) => {
    const { name } = req.body;
   
    if (!name) {
      return res
        .status(422)
        .json({ error: "A name for the cohort is required" });
    }
    cohorts
      .create( {name} )
      .then(result => {
        res.status(201).json(result[0]);
      })
      .catch(err => {
        res.status(500).json({ error: "Server Error. The cohort could not be added" });
      });
  });


// The R in CRUD

router.get("/", (req, res) => {
  cohorts
    .read()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err =>
      res.status(500).json({ message: "Server Error. Unable to Read Cohorts" })
    );
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  cohorts
    .readById(id)
    .then(cohort => {
      if (cohort) {
        res.json(cohort);
      } else {
        res.status(404).json({ message: "Cohort Not Found" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Server Error. Could Not Retrieve Cohort" });
    });
});

router.get("/:id/students", (req, res) => {
  students
    .searchByCohort(req.params.id)
    .then(student => {
      if (student.length) {
        res.json(student);
      } else
        res.status(404).json({
          message: "The cohort cannot be found, or has no students currently assigned to it"
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Server Error. The cohort information could not be retrieved" })
    );
});



// The U in CRUD

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  cohorts
    .update(id, changes)
    .then(cohort => {
      if (!cohort) {
        res.status(404).json({ message: "The specified Cohort could not be found" });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => res.status(500).json({ error: "Server Error. The cohort could not be updated" }));
});

// The D in CRUD

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  cohorts
    .del(id)
    .then(cohort => {
      if (!cohort) {
        res.status(404).json({ message: "The specified cohort could not be found" });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => res.status(500).json({ error: "Server Error. The cohort could not be deleted" }));
});

module.exports = router;
