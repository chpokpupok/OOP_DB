const pool = require("../db");
const queries = require("../queries");

//КАМИЛЬ
//ФУНКЦИЯ ПРОСМОТРА КУРСОВЫХ РАБОТ
const getCourseworksForTeacher = (req, res) => {
    const supervisor_id = req.body.supervisor_id || req.params.supervisor_id;

    pool.query(
        queries.getCourseworksForTeacher,
        [supervisor_id],
        (error, results) => {
            if (error) {
                console.error("Ошибка при получении курсовых:", error);
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({
                success: true,
                count: results.rows.length,
                data: results.rows
            });
        }
    );
};

//ФУНКЦИЯ ГЕНЕРАЦИИ ЛОГИНОВ И ПАРОЛЕЙ
const getStudentCredentials = (req, res) => {
    pool.query(queries.generateStudentCredentials, (error, results) => {
        if (error) {
            console.error("Ошибка при генерации логинов:", error);
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({
            success: true,
            count: results.rows.length,
            data: results.rows
        });
    });
};

// ФУНКЦИЯ СОЗДАНИЯ ОТЧЕТА (ФИО, ТЕМА, ДАТА)
const getCourseworkReport = (req, res) => {
    pool.query(queries.createCourseworkReport, (error, results) => {
        if (error) {
            console.error("Ошибка при создании отчета:", error);
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({
            success: true,
            count: results.rows.length,
            data: results.rows
        });
    });
};

module.exports = {
    //камиль
    getCourseworksForTeacher,
    getStudentCredentials,
    getCourseworkReport
};