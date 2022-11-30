const express = require("express");

const userController = require("../controllers/user-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/login", userController.login);

router.use(checkAuth); // every route after this requires an token

router.post("/createUser", userController.createUser);

router.patch("/general", userController.editGeneral); //fn, ln, pn, jc, imageurl, email, phoneNumber

router.post("/position", userController.addPosition);

router.patch("/position", userController.editPosition);

router.delete("/position", userController.removePosition);

router.patch("/availability", userController.editAvailability);

router.get("/general", userController.getGeneral); //fn, ln, pn, jc, imageurl, email, phoneNumber, primaryLocation

router.get("/positions", userController.getPositions); //in order of priority

router.get("/availability", userController.getAvailability);

module.exports = router;
