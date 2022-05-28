const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//Create movie

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//Update movie

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//Delete movies

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//Get movies

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get movie random

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "movie") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all movies

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// get movie via tag
router.get("/taggenre", verify, async (req, res) => {
  const genreQuery = req.query.genre;

  if (req.user.isAdmin) {
    try {
      if (genreQuery) {
        movies = await Movie.aggregate([
          { $sample: { size: 100 } },
          {
            $match: {
              genre: genreQuery,
            },
          },
        ]);
      } else {
        movies = await Movie.aggregate([{ $sample: { size: 100 } }]);
      }
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

router.get("/tagyear", verify, async (req, res) => {
  const yearQuery = req.query.year;
  if (req.user.isAdmin) {
    try {
      if (yearQuery) {
        movies = await Movie.aggregate([
          { $sample: { size: 100 } },
          {
            $match: {
              year: yearQuery,
            },
          },
        ]);
      } else {
        movies = await Movie.aggregate([{ $sample: { size: 100 } }]);
      }
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

router.get("/tagnation", verify, async (req, res) => {
  const nationQuery = req.query.nation;
  if (req.user.isAdmin) {
    try {
      if (nationQuery) {
        movies = await Movie.aggregate([
          { $sample: { size: 100 } },
          {
            $match: {
              nation: nationQuery,
            },
          },
        ]);
      } else {
        movies = await Movie.aggregate([{ $sample: { size: 100 } }]);
      }
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
