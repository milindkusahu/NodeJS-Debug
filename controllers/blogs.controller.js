const BlogService = require("../services/blogs.service");
const BlogServiceInstance = new BlogService();

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogServiceInstance.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Could Not Fetch Blogs from DB", error });
  }
};

const createNewBlog = async (req, res) => {
  try {
    const body = req.body;
    const newBlog = await BlogServiceInstance.create(body);
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({
      message: "Couldn't create new blog post. Please try again",
      error,
    });
  }
};

const deleteBlogWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogServiceInstance.delete(id);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't delete blog post. Please try again", error });
  }
};

const updateBlogsWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body; //updates to be perfomed

    const result = await BlogServiceInstance.update(id, update);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't save blog post. Please try again", error });
  }
};

const searchBlogs = async (req, res) => {
  try {
    const { title, author } = req.query;
    console.log("Search params:", { title, author });
    const result = await BlogServiceInstance.findByAuthorOrTitle({
      title,
      author,
    });
    console.log("FROM Service", { result });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't fetch blog posts. Please try again", error });
  }
};

module.exports = {
  getAllBlogs,
  createNewBlog,
  deleteBlogWithId,
  updateBlogsWithId,
  searchBlogs,
};
