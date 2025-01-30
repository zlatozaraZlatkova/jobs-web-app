const router = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { getAll, getById } = require("../services/postService");
const { errorParser } = require("../util/errorParser");

router.get("/", hasUser(), async (req, res) => {
  try {
    const allPosts = await getAll();

    if (allPosts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(allPosts);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }

})


router.get("/:id", async (req, res) => {
  try {
    const post = await getById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }

});

module.exports = router;
