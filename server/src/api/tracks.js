const { Router } = require('express');

const TrackEntry = require('../models/TrackEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const allTracks = await TrackEntry.find();
    res.json(allTracks);
  } catch (error) {     
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const trackEntry = new TrackEntry(req.body);
    const createdEntry = await trackEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});


router.delete("/", async (req, res, next) => {
  try{
    console.log(`bb${req.headers}${JSON.stringify(req.body)}`)  
    const trackEntry = new TrackEntry(req.body);
    const deletedEntry = TrackEntry.deleteOne(trackEntry,
      function (error) {
        if (error)  return console.error(error);
      })
    console.log("deleted" +  JSON.stringify(deletedEntry.body));
    res.json("deleted " + trackEntry);
  }catch(error){
    console.log(error);
  }
})



module.exports = router;