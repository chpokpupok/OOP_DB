const { Router } = require("express");
const controller = require("../controllers/functionController");

const router = Router();

//камиль
router.post("/get-courseworks", controller.getCourseworksForTeacher);
router.get("/get-courseworks/:supervisor_id", controller.getCourseworksForTeacher);
router.get("/student-credentials", controller.getStudentCredentials);
router.get("/coursework-report", controller.getCourseworkReport);

module.exports = router;