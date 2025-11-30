const { Router } = require("express");
const controller = require("../controllers/procedureController");

// создаем объект маршрутизатор
const router = Router();

// добавляем маршруты для хранимых процедур
router.post("/register_supervisor/", controller.register_supervisor);

// экспортируем маршрутизатор на server
module.exports = router;

