const express = require("express");

const scheduleController = require("../controllers/schedule-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/create", scheduleController.create);

router.patch("/calendar/:lid", scheduleController.editCalendar);

router.get("/calendar/:lid", scheduleController.getCalendar);

router.get("/schedule/:lid", scheduleController.getSchedule);

module.exports = router;
