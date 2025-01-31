const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { loadItem } = require("../middlewares/preload");
const { hasUser, isOwner } = require("../middlewares/guards");

const { getAll, getById, getByUserId, createItem, updateItem, deleteById } = require("../services/postService");
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


router.get("/:id", hasUser(), async (req, res) => {
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

router.post("/create", hasUser(),
  body("postTitle", "Title is required").not().isEmpty(),
  body("postTitle", "Please enter a title up to 150 characters long").isLength({ max: 150 }),
  body("postText", "Post is required").not().isEmpty(),
  body("postText", "Please enter a post up to 3000 characters long").isLength({ max: 3000 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

    try {
      const userId = req.user._id;
      const user = await getByUserId(userId);

      if (!user) {
        res.status(404).json({ message: "Invalid access token" })
      }

      const post = {
        name: user.name,
        postTitle: req.body.postTitle,
        postText: req.body.postText,
        avatar: user.avatar,
        ownerId: userId,
      }



      const createPost = await createItem(userId, post);

      res.status(200).json(createPost);

    } catch (error) {
      console.log(error)
      const message = errorParser(error);
      res.status(400).json({ message });
    }

  })


router.put("/update/:id", loadItem, isOwner(),
  body("postTitle", "Title is required").not().isEmpty(),
  body("postTitle", "Please enter a title up to 150 characters long").isLength({ max: 150 }),
  body("postText", "Post is required").not().isEmpty(),
  body("postText", "Please enter a post up to 3000 characters long").isLength({ max: 3000 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

    try {
      const postId = req.params.id;

      const postData = { postTitle, postText } = req.body;

      const updatedPost = await updateItem(postId, postData);

      res.status(200).json(updatedPost);

    } catch (error) {
      console.log(error)
      const message = errorParser(error);
      res.status(400).json({ message });
    }

  })

  router.delete("/delete/:id", loadItem, isOwner(), async (req, res) => {

    try {
  
      await deleteById(req.params.id, req.user._id);

      res.status(200).json({ message: "Post deleted" });
  
    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });
    }
  })
  

module.exports = router;
