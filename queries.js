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

//ПРОЦЕДУРЫ САФИРА
const register_supervisor = "call register_supervisor($1, $2, $3, $4, $5, $6, $7, $8)"; 
const update_supervisor = "call update_supervisor($1, $2, $3, $4, $5, $6, $7, $8)";
const delete_supervisor = "call delete_supervisor($1)";
const insert_discipline = "call insert_discipline($1, $2, $3)";
const update_discipline = "call update_discipline($1, $2, $3, $4, $5)";
const delete_discipline = "call delete_discipline($1, $2)";
const insert_group = "call insert_group($1, $2, $3, $4, $5)";
const update_group = "call update_group($1, $2, $3, $4, $5)";
const delete_group = "call delete_group($1)";
const insert_department = "call insert_department($1, $2, $3, $4)";


module.exports = {
  get_faculty,
  get_faculty_by_id,
  add_faculty,
  update_faculty,
  delete_faculty,

  //сафира
  register_supervisor,
  update_supervisor,
  delete_supervisor,
  insert_discipline,
  update_discipline,
  delete_discipline,
  insert_group,
  update_group,
  delete_group,
  insert_department,
};