const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { loadItem } = require("../middlewares/preload");
const { hasUser, isOwner } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");

const { 
  getAll, 
  getById, 
  getByUserId, 
  createItem, 
  updateItem, 
  deleteById, 
  createComment, 
  deleteComment, 
  likeItem,
  dislikeItem
} = require("../services/postService");



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

router.post("/comment/:postId/create", hasUser(),
  body("text", "Comment is required").not().isEmpty(),
  body("text", "Comment shouldn't contain more than 250 characters").isLength({ max: 250 }),
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }


    try {
      const userId = req.user._id;
      const user = await getByUserId(userId);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: userId,
      }

      const comment = await createComment(req.params.postId, newComment);

      if (!comment) {
        return res.status(400).json({ message: "Failed to create comment" });
      }
 
      res.status(200).json(comment);


    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });
    }

  })


router.delete("/comment/:id/:commentId", hasUser(), loadItem, async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;
  const commentId = req.params.commentId;

  try {

    const post = req.item;
  
    const userComment = post.comments.find(comment => comment.id === commentId);

    if (!userComment) {
      res.status(404).json({ message: "Comment does'n exist" });
    }

    if (userComment.user.toString() !== userId) {
      return res.status(403).json({ message: "You cannot modify this record" });
    }

    await deleteComment(postId, commentId);

    res.status(200).json({ message: "Comment deleted" });


  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }

})

router.post("/like/:id", hasUser(), loadItem, async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;


  try {
    const post = req.item;
   
    if (post.ownerId.toString() == userId.toString()) {
      return res.status(400).json({ message: "Not able to like your own post" });
    }

    if (post.postLikes.map((c) => c.toString()).includes(userId.toString()) == true) {
      return res.status(400).json({ message: "Post already liked" });
    }

    if (post.ownerId._id.toString() !== req.user._id.toString() && post.postLikes.some(user => user._id.equals(req.user._id)) == false) {
      
      await likeItem(postId, userId);
      
      return res.status(200).json({ message: "Liked!" });
    }


  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }

})


router.post("/unlike/:id", hasUser(), loadItem, async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  try {
    const post = req.item;
 
    if (post.ownerId.toString() == userId.toString()) {
      return res.status(400).json({ message: "Not able to dislike your own post" });
    }

    if (post.postLikes.some(user => user._id.equals(req.user._id)) == false) {
      return res.status(400).json({ message: "Post has not been liked yet" });
    }

    if (post.ownerId._id.toString() !== req.user._id.toString() && post.postLikes.some(user => user._id.equals(req.user._id)) == true) {
      
      await dislikeItem(postId, userId);

      return res.status(200).json({ message: "Unlike!" });
    }


  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }

})


module.exports = router;
