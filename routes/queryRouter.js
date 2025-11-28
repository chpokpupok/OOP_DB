const { Router } = require("express");
const controller = require("../controllers/queryController");

// создаем объект маршрутизатор
const router = Router();

// добавляем маршруты для запросов
router.get("/", controller.get_faculty); // вызов метода getCooperator (находиться в файле controller.js) для объекта controller
router.get("/:id", controller.getCooperatorById);
router.post("/", controller.add_faculty);
router.put("/:id", controller.updateCooperator);
router.delete("/:id", controller.removeCooperator);

// экспортируем маршрутизатор на server
module.exports = router;