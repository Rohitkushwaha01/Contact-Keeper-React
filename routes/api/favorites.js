const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Contact = require("../../models/Contact");
const User = require("../../models/User");
const router = express.Router();

// @route   Get api/favorites
// @desc    Get all Post of the Logged In User
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const currentUserContact = await Contact.find({ user: req.user.id });

    const favorites = currentUserContact.map(item =>{
      if(item.favorite === true) return item;
    }).filter((item) => item !== undefined);
    console.log("Got favorites")
    return res.status(200).json(favorites);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
