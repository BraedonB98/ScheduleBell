const express = require("express");

const userController = require("../controllers/user-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/login", userController.login);

router.use(checkAuth); // every route after this requires an token

router.post("/addUser", userController.addUser); //Will create a "user" based on username, will set password to LastName, FirstName, no spaces until they sign in the first time

router.patch("/general", userController.general); //fn, ln, pn, jc, imageurl, email, phoneNumber

router.patch("/transferLocation", userController.transferPrimaryLocation);

router.patch("/jobCode", userController.editJobCode);

router.patch("/payRate", userController.editPayRate);

router.patch("/availability", userController.editAvailability);

router.delete("/altLocation", userController.removeAltLocation);

router.get("/general", userController.getGeneral); //fn, ln, pn, jc, imageurl, email, phoneNumber, primaryLocation

router.get("/locations", userController.getLocations); //primary followed by alt

router.get("/payRate", userController.getPayRate);

router.get("/availability", userController.getAvailability);

module.exports = router;
