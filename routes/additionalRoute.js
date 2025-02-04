const express = require("express");
const upload = require("../middleware/fileUpload");
const {
  create,
  detail,
  findDelete,
  getAll,
  update,
} = require("../controller/additionalController");

const router = express.Router();

// Configure the upload middleware to handle 'cover' and 'logo' fields
const cpUploads = upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);

router.route("/update").put(cpUploads, update);
router.route("/").post(cpUploads, create).get(getAll);
router.route("/:id").get(detail).delete(findDelete);

module.exports = router;
