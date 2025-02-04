express = require("express");
const upload = require("../middleware/fileUpload");
const {
  create,
  detail,
  findDelete,
  getAll,
  update,
} = require("../controller/teamController");
const router = express.Router();
const cpUploads = upload.single("file");
router.route("/").post(cpUploads, create).get(getAll);
router.route("/:id").get(detail).delete(findDelete).put(cpUploads, update);

module.exports = router;