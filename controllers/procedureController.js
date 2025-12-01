//импорт пула БД
const pool = require("../db");
const queries = require("../queries");

//регистрация препода
const register_supervisor = (req, res) => {

    const {login, password, last_name, first_name, middle_name, position, phone_number, email} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.register_supervisor,
        [login, password, last_name, first_name, middle_name, position, phone_number, email],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Superviser insered");
        }
    );
};

//обновление препода
const update_supervisor = (req, res) => {

    const {login, password, last_name, first_name, middle_name, position, phone_number, email} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.update_supervisor,
        [login, password, last_name, first_name, middle_name, position, phone_number, email],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Superviser updated");
        }
    );
};

//удаление препода
const delete_supervisor = (req, res) => {

    const {login} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.delete_supervisor,
        [login],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Superviser deleted");
        }
    );
};

//добавление дисциплины
const insert_discipline = (req, res) => {

    const {name, department, semester} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.insert_discipline,
        [name, department, semester],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Discipline insered");
        }
    );
};

//обновление дисциплины
const update_discipline = (req, res) => {

    const {old_name, old_department, new_name, new_department, semester} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.update_discipline,
        [old_name, old_department, new_name, new_department, semester],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Discipline updated");
        }
    );
};

//удаление дисциплины
const delete_discipline = (req, res) => {

    const {name, department} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.delete_discipline,
        [name, department],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Discipline deleted");
        }
    );
};

//добавление группы
const insert_group = (req, res) => {

    const {name, year_of_admission, department, education_type, study_duration} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.insert_group,
        [name, year_of_admission, department, education_type, study_duration],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Group insered");
        }
    );
};

//обновление группы
const update_group = (req, res) => {

    const {name, year_of_admission, department, education_type, study_duration} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.update_group,
        [name, year_of_admission, department, education_type, study_duration],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Group updated");
        }
    );
};

//удаление группы
const delete_group = (req, res) => {

    const {name} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.delete_group,
        [name],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Group deleted");
        }
    );
};

//добавление кафедры
const insert_department = (req, res) => {

    const {name, faculty, head, phone} = req.body; // извлекаем данные из тела объекта

    pool.query(
        queries.insert_department,
        [name, faculty, head, phone],
        (error, results) => {
        if (error) res.status(500).json({ error: "Ошибка сервера", details: error.message }); //если есть ошибка, то вывести сообщение об ошибке
        res.status(201).send("Department insered");
        }
    );
};

//КАМИЛЬ
//ПРОЦЕДУРА ИЗМЕНЕНИЯ КУРСОВОЙ РАБОТЫ
const update_coursework_teacher = (req, res) => {
    const {
        coursework_id, topic, submission_date, defense_date, topic_status,
        work_link, antiplagiat_level, theory_grade, practice_grade,
        design_grade, defense_grade, commission, work_status, comment
    } = req.body;

    pool.query(
        queries.update_coursework_teacher,
        [
            coursework_id, topic, submission_date, defense_date, topic_status,
            work_link, antiplagiat_level, theory_grade, practice_grade,
            design_grade, defense_grade, commission, work_status, comment
        ],
        (error, results) => {
            if (error) {
                console.error("Ошибка при обновлении курсовой:", error);
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({ 
                success: true, 
                message: "Курсовая работа обновлена успешно" 
            });
        }
    );
};

//ПРОЦЕДУРА ДОБАВЛЕНИЯ В ПЛАН КУРСОВЫХ
const add_coursework_plan = (req, res) => {
    const { student_login, supervisor_login, discipline_name, coursework_topic, coursework_date } = req.body;

    pool.query(
        queries.add_coursework_plan,
        [student_login, supervisor_login, discipline_name, coursework_topic, coursework_date],
        (error, results) => {
            if (error) {
                console.error("Ошибка при добавлении в план:", error);
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json({
                success: true,
                message: "Курсовая добавлена в план успешно"
            });
        }
    );
};

//ПРОЦЕДУРА УДАЛЕНИЯ ИЗ ПЛАНА КУРСОВЫХ
const remove_coursework_plan = (req, res) => {
    const plan_id = req.params.plan_id || req.body.plan_id;

    pool.query(
        queries.remove_coursework_plan,
        [plan_id],
        (error, results) => {
            if (error) {
                console.error("Ошибка при удалении из плана:", error);
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({
                success: true,
                message: "Курсовая удалена из плана успешно"
            });
        }
    );
};


//ПРОЦЕДУРА ДОБАВЛЕНИЯ В КАФЕДРУ ПРЕПОДАВАТЕЛЯ
const add_supervisor_department = (req, res) => {
    const { supervisor_login, department_name } = req.body;

    pool.query(
        queries.add_supervisor_department,
        [supervisor_login, department_name],
        (error, results) => {
            if (error) {
                console.error("Ошибка при добавлении в кафедру:", error);
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json({
                success: true,
                message: "Преподаватель добавлен к кафедре успешно"
            });
        }
    );
};

// ПРОЦЕДУРА УДАЛЕНИЯ ИЗ КАФЕДРЫ ПРЕПОДАВАТЕЛЯ
const remove_supervisor_department = (req, res) => {
    const link_id = req.params.link_id || req.body.link_id;

    pool.query(
        queries.remove_supervisor_department,
        [link_id],
        (error, results) => {
            if (error) {
                console.error("Ошибка при удалении из кафедры:", error);
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({
                success: true,
                message: "Преподаватель удален из кафедры успешно"
            });
        }
    );
};

//артем

const delete_department = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query(queries.delete_department, [name]);
    res.status(200).json({ success: true, message: 'Department deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update_department = async (req, res) => {
  const { old_name, new_name, faculty, head, phone } = req.body;
  try {
    await pool.query(queries.update_department, [old_name, new_name, faculty, head, phone]);
    res.status(200).json({ success: true, message: 'Department updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const insert_faculty = async (req, res) => {
  const { name, dean, phone } = req.body;
  try {
    await pool.query(queries.insert_faculty, [name, dean, phone]);
    res.status(201).json({ success: true, message: 'Faculty inserted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const delete_faculty = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query(queries.delete_faculty, [name]);
    res.status(200).json({ success: true, message: 'Faculty deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update_faculty = async (req, res) => {
  const { old_name, new_name, dean, phone } = req.body;
  try {
    await pool.query(queries.update_faculty, [old_name, new_name, dean, phone]);
    res.status(200).json({ success: true, message: 'Faculty updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const add_students_to_group = async (req, res) => {
  const { group_name, students_list } = req.body;
  try {
    await pool.query(queries.add_students_to_group, [group_name, students_list]);
    res.status(201).json({ success: true, message: 'Students added to group' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update_student = async (req, res) => {
  const { student_login, phone, email, leader } = req.body;
  try {
    await pool.query(queries.update_student, [student_login, phone, email, leader]);
    res.status(200).json({ success: true, message: 'Student updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const insert_course_work = async (req, res) => {
  const { student_login, supervisor_login, discipline_name, topic } = req.body;
  try {
    await pool.query(queries.insert_coursework, [student_login, supervisor_login, discipline_name, topic]);
    res.status(201).json({ success: true, message: 'Coursework created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const delete_course_work = async (req, res) => {
  const { coursework_id } = req.body;
  try {
    await pool.query(queries.delete_coursework, [coursework_id]);
    res.status(200).json({ success: true, message: 'Coursework deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update_course_work_student = async (req, res) => {
  const { coursework_id, topic, work_link } = req.body;
  try {
    await pool.query(queries.update_coursework_student, [coursework_id, topic, work_link]);
    res.status(200).json({ success: true, message: 'Coursework updated by student' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
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
  remove_coursework_plan,
  add_supervisor_department,
  remove_supervisor_department,

  //артем
  update_course_work_student,
  delete_course_work,
  insert_course_work,
  update_student,
  add_students_to_group,
  update_faculty,
  delete_faculty,
  insert_faculty,
  update_department,
  delete_department

};
