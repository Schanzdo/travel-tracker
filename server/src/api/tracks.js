const { Router } = require('express');

const TrackEntry = require('../models/TrackEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const allTracks = await TrackEntry.find();
    res.json(allTracks);
  } catch (error) {
      console.log("aa")
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new TrackEntry(req.body);
    const createdEntry = await trackEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;