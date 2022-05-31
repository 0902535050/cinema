const router = require("express").Router();

const Comment = require("../models/Comment");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user) {
    const newComment = await Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json(500);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
//GET ALL COMMENT
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const comments = query
        ? await Comment.find().sort({ _id: -1 }).limit(30)
        : await Comment.find();
      res.status(200).json(comments);
      // res.status(200).json(comments.reverse().limit(5)); // 1 cách để đảo comment mới lên đầu
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

router.get("/find/:id", verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
