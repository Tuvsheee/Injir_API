express = require("express");
const {
  create,
  detail,
  findDelete,
  getAll,
  update,
} = require("../controller/requestController");
const router = express.Router();

router.route("/").post(create).get(getAll);
router.route("/:id").get(detail).delete(findDelete).put(update);

module.exports = router;
