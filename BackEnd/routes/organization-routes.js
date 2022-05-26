const express = require("express");

const organizationController = require("../controllers/organization-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/create", organizationController.create); //eventually move this above check auth, for now new Org has to reach out to admin

router.patch("/general/:oid", organizationController.editGeneral); //name, image, colorScheme

router.patch("/accountType/:oid", organizationController.editAccountType); //upgrade subscription

router.patch("/admins/:oid", organizationController.editAuthorizedUsers); //add or remove admins (email both removed and added)

router.patch("/image/:oid", organizationController.patchImage);

router.delete("/remove/:oid", organizationController.delete); //!have a timeout for a 7 days before it actually removes and email owner

router.get("/general/:oid", organizationController.getGeneral);

router.get("/accountType/:oid", organizationController.getAccountType);

router.get("/locations/:oid", organizationController.getLocations);

module.exports = router;
