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

//ПРОЦЕДУРЫ КАМИЛЬ
const updateCourseworkTeacher = "CALL update_coursework_teacher($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)";
const addCourseworkPlan = "CALL add_coursework_plan($1, $2, $3, $4, $5)";
const removeCourseworkPlan = "CALL remove_coursework_plan($1)";
const addSupervisorDepartment = "CALL add_supervisor_department($1, $2)";
const removeSupervisorDepartment = "CALL remove_supervisor_department($1)";

//ПОЛЬЗОВАТЕЛЬСКИЕ ФУНКЦИИ КАМИЛЬ
const getCourseworksForTeacher = "SELECT * FROM get_courseworks_for_teacher($1)";
const generateStudentCredentials = "SELECT * FROM generate_student_credentials()";
const createCourseworkReport = "SELECT * FROM create_coursework_report()";

//ОБЫЧНЫЕ ЗАПРОСЫ ДЛЯ ТАБЛИЦЫ COURSEWORK КАМИЛЬ
const getCourseworks = "SELECT * FROM coursework";
const getCourseworkById = "SELECT * FROM coursework WHERE coursework_id = $1";
const addCoursework = "INSERT INTO coursework (student_id, supervisor_id, discipline_id, topic) VALUES ($1, $2, $3, $4)";
const updateCoursework = "UPDATE coursework SET topic = $1 WHERE coursework_id = $2";
const removeCoursework = "DELETE FROM coursework WHERE coursework_id = $1";


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

  //камиль
  update_coursework_teacher,
  add_coursework_plan,
  remove_poursework_plan,
  add_supervisor_department,
  remove_supervisor_department,

  get_courseworks_for_teacher,
  generate_student_credentials,
  create_coursework_report,

  get_courseworks,
  get_coursework_byId,
  add_coursework,
  update_coursework,
  remove_coursework
};