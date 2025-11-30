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

module.exports = {
  register_supervisor,
};
