const express = require("express");

const organizationController = require("../controllers/organization-controller");
//const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/create", organizationController.create);

router.patch("/general/:oid", organizationController.editGeneral); //name, image, colorScheme

router.patch("/subscription/:oid", organizationController.editSubscription); //upgrade subscription

router.patch("/editAuth/:oid", organizationController.editAuth); //add admin (email added)

router.patch("/image/:oid", organizationController.patchImage);

router.delete("/remove/:oid", organizationController.delete); //!have a timeout for a 7 days before it actually removes and email owner

router.get("/general/:oid", organizationController.getGeneral);

router.get("/subscription/:oid", organizationController.getSubscription);

module.exports = router;
