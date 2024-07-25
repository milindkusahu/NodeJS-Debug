const router = require("express").Router();
const {
  getAllBlogs,
  createNewBlog,
  deleteBlogWithId,
  updateBlogsWithId,
  searchBlogs
} = require("../controllers/blogs.controller");

router.get("/", getAllBlogs);
router.get("/search", searchBlogs);
router.post("/new", createNewBlog);
router.delete("/:id", deleteBlogWithId);
router.patch("/:id", updateBlogsWithId);

module.exports = router;
