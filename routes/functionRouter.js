const { Router } = require("express");
const controller = require("../controllers/functionController");

const router = Router();

//камиль
router.post("/get-courseworks", controller.get_courseworks_for_teacher);
router.get("/get-courseworks/:supervisor_id", controller.get_courseworks_for_teacher);
router.get("/student-credentials", controller.get_student_credentials);
router.get("/coursework-report", controller.get_coursework_report);

module.exports = router;