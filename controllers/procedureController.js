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
};
