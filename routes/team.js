const express = require("express")
const router = express.Router();
const {getAll, getOne, update, deletedteam, create} = require("../controllers/team")

router.get("/", getAll)
router.get("/:team_id", getOne)
router.post("/", create)
// router.put("/:team_id", update)
router.delete("/:team_id", deletedteam)

module.exports = router;
