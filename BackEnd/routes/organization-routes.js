const express = require("express");

const organizationController = require("../controllers/organization-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", organizationController.create);

router.use(checkAuth); // every route after this requires an token

router.patch("/general/:oid", organizationController.editGeneral); //name, image, colorScheme

router.patch("/accountType/:oid", organizationController.editAccountType); //upgrade subscription

router.patch("/addAdmins/:oid", organizationController.addAuthorizedUser); //add admin (email added)

router.patch("/removeAdmins/:oid", organizationController.removeAuthorizedUser); //remove admin(email removed)

router.patch("/image/:oid", organizationController.patchImage);

router.delete("/remove/:oid", organizationController.delete); //!have a timeout for a 7 days before it actually removes and email owner

router.get("/general/:oid", organizationController.getGeneral);

router.get("/accountType/:oid", organizationController.getAccountType);

module.exports = router;
