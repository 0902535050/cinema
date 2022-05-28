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
  if (req.user.isAdmin) {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// router.get("/exact", verify, async (req, res) => {
//   const ownQuery = req.query.own;
//   let comments;
//   try {
//     if (ownQuery) {
//       comments = await Comment.aggregate([
//         { $sample: { size: 10 } },
//         {
//           $match: { own: ownQuery },
//         },
//       ]);
//     } else {
//       comments = await Comment.aggregate([{ $sample: { size: 10 } }]);
//     }

//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/find/:id", verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
