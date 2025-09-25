const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/internshipController");

router.get("/", ctrl.getInternships);
router.get("/:id", ctrl.getInternshipById);
router.post("/", auth, ctrl.createInternship);
router.put("/:id", auth, ctrl.updateInternship);
router.delete("/:id", auth, ctrl.deleteInternship);

module.exports = router;
