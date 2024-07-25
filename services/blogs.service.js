const Blogs = require("../models/blog.model");

class BlogService {
  save = async (doc) => {
    const result = await doc.save();
    return result;
  };

  findAll = async () => {
    const allBlogs = await Blogs.find({});
    return allBlogs;
  };

  create = async (body) => {
    const newDoc = new Blogs(body);
    const savedDoc = await this.save(newDoc);
    return savedDoc;
  };

  delete = async (documentId) => {
    const deletedDoc = await Blogs.findOneAndDelete(documentId);
    return deletedDoc;
  };

  update = async (id, updateObject) => {
    try {
      const filter = { _id: id };
      const options = { new: true };
      const updatedDoc = await Blogs.findOneAndUpdate(
        filter,
        updateObject,
        options
      );
      return updatedDoc;
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  };

  findByAuthorOrTitle = async ({ title, author }) => {
    console.log("service called with:", { title, author });
    const matchingBlogs = await Blogs.find({
      $or: [
        { title: { $regex: new RegExp(title), $options: "gi" } },
        { author: { $elemMatch: { email: author } } },
      ],
    });

    console.log("Query result:", { matchingBlogs });

    return matchingBlogs;
  };
}

module.exports = BlogService;
