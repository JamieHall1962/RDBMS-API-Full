const express = require("express");

const students = require("./studentsModel");

const router = express.Router();


// The C in CRUD

router.post("/", (req, res) => {
    const { name, cohort_id } = req.body;
    const student = { name, cohort_id };
  
    if (!name || !cohort_id) {
      return res.status(422).json({
        error: "A student Name and Cohort ID are required"
      });
    }
    students
      .create(student)
      .then(result => {
        res.status(201).json(result[0]);
      })
      .catch(err => {
        res.status(500).json({ error: "Server Error. The student could not be added" });
      });
  });

  // The R in CRUD

router.get("/", (req, res) => {
  students
    .read()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json({ error: "Server Error. The students could not be retrieved" }));
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;

    students
    .readById(id)
      .then(student => {
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: "Student could not be found" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Server Error. Student could not be found" });
      });
  });


// The U in CRUD

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  students
    .update(id, changes)
    .then(student => {
      if (!student) {
        res.status(404).json({ message: "The student with the specified ID could not be found" });
      } else {
        res.status(200).json(student);
      }
    })
    .catch(err => res.status(500).json({ message: "Server Error. Student could not be updated" }));
});

// the D in CRUD

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  students
    .del(id)
    .then(student => {
      if (!student) {
        res.status(404).json({ message: "The student with the specified ID could not be found" });
      } else {
        res.status(200).json(student);
      }
    })
    .catch(err => res.status(500).json({ message: "Server Error. Student could not be deleted" }));
});

module.exports = router;