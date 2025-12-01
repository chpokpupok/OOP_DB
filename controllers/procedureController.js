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
  remove_supervisor_department
};
