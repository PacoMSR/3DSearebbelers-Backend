const router = require("express").Router();

const Buoy = require("../models/Buoy");

// create a buoy
router.post("/", async (req, res) => {
  const newBuoy = new Buoy(req.body);
  try {
    const savedBuoy = await newBuoy.save();
    res.status(200).json(savedBuoy);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all buoys
router.get("/", async (req, res) => {
  try {
    const buoys = await Buoy.find();
    res.status(200).json(buoys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
