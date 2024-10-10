const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const catchAsync = require("../utils/catchAsyncError");
const {
    postJob,
    getJobs,
    getJobById,
    deleteJob,
    editJob,
    searchJobByTitle,
    linkedInJobs,
} = require("../controllers/jobControllers");

router.post("/", authMiddleware, catchAsync(postJob));
router.get("/", catchAsync(getJobs));
router.get("/:id", catchAsync(getJobById));
router.delete("/:id", authMiddleware, catchAsync(deleteJob));

router.put("/:id", authMiddleware, catchAsync(editJob));
// TODO: add skills also
router.get("/search/:title", catchAsync(searchJobByTitle));

router.get("/linkedin/:name", catchAsync(linkedInJobs));

module.exports = router;
