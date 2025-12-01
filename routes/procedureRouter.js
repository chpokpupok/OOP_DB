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
//камиль
router.put("/update-coursework", controller.updateCourseworkTeacher);
router.post("/add-coursework-plan", controller.addCourseworkPlan);
router.delete("/remove-coursework-plan/:plan_id", controller.removeCourseworkPlan);
router.post("/remove-coursework-plan", controller.removeCourseworkPlan);
router.post("/add-supervisor-department", controller.addSupervisorDepartment);
router.delete("/remove-supervisor-department/:link_id", controller.removeSupervisorDepartment);
router.post("/remove-supervisor-department", controller.removeSupervisorDepartment);

// экспортируем маршрутизатор на server
module.exports = router;

