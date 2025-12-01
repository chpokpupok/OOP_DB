const { Router } = require("express");
const controller = require("../controllers/procedureController");

// создаем объект маршрутизатор
const router = Router();

// добавляем маршруты для хранимых процедур
//сафира
router.post("/register_supervisor/", controller.register_supervisor);
router.put("/update_supervisor/", controller.update_supervisor);
router.delete("/delete_supervisor/", controller.delete_supervisor);
router.post("/insert_discipline/", controller.insert_discipline);
router.put("/update_discipline/", controller.update_discipline);
router.delete("/delete_discipline/", controller.delete_discipline);
router.post("/insert_group/", controller.insert_group);
router.put("/update_group/", controller.update_group);
router.delete("/delete_group/", controller.delete_group);
router.post("/insert_department/", controller.insert_department);

// экспортируем маршрутизатор на server
module.exports = router;

