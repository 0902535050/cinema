const router = require("express").Router();
const Actor = require("../models/Actor");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newActor = await Actor(req.body);
    try {
      const savedActor = await newActor.save();
      res.status(201).json(savedActor);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedActor = await Actor.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedActor);
    } catch (error) {
      res.status(500).json(500);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Actor.findByIdAndDelete(req.params.id);
      res.status(200).json("The actor has been delete...");
    } catch (error) {
      res.status(500).json("You are not allowed!");
    }
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET ALL
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const actors = await Actor.find();
      res.status(200).json(actors.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
