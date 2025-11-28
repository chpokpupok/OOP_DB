// queries.js

// SELECT
const get_faculty = "SELECT * FROM faculty";
const get_faculty_by_id = "SELECT * FROM faculty WHERE faculty_id = $1";

// INSERT
const add_faculty =
  "INSERT INTO faculty (name, dean, phone_number) VALUES ($1, $2, $3) RETURNING *";

// UPDATE
const update_faculty =
  "UPDATE faculty SET name = $1, dean = $2, phone_number = $3 WHERE faculty_id = $4 RETURNING *";

// DELETE
const delete_faculty =
  "DELETE FROM faculty WHERE faculty_id = $1 RETURNING *";

module.exports = {
  get_faculty,
  get_faculty_by_id,
  add_faculty,
  update_faculty,
  delete_faculty,
};
