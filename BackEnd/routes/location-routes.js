const express = require("express");

const locationController = require("../controllers/location-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/add", locationController.add);

router.patch("/editAuth", locationController.editAuth);

router.patch("/hireStaff", locationController.hireStaff);

router.patch("/location", locationController.editLocation); //including notes

router.patch("/image/:lid", locationController.patchImage);

router.delete("/remove/:lid", locationController.delete);

router.delete("/removeStaff", locationController.removeStaff);

router.post("/add", locationController.notification);

router.delete("/add", locationController.deleteNotification);

router.get("/general/:lid", locationController.getRestricted); //name, organization, location number, imageUrl, location

router.get("/notes/:lid", locationController.getNotes);

router.get("/staff/:lid", locationController.getStaff); //Gets active staff

router.get("/staffArchived/:lid", locationController.getArchivedStaff);

router.get("/schedule/:lid", locationController.getSchedule); //Gets active schedule

router.get("/archivedSchedule/:lid", locationController.getArchivedSchedule);

module.exports = router;
