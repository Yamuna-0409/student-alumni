const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/courseController");

router.get("/", ctrl.getCourses);
router.post("/", auth, ctrl.createCourse);

module.exports = router;
