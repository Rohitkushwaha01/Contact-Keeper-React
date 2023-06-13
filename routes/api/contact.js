const express = require("express");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Contact = require("../../models/Contact");
const User = require("../../models/User");
const router = express.Router();

// @route   POST api/contact/
// @desc    Create a Contact
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required").not().isEmpty(),
      check("number", "Number is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.message });
    }

    const { name, email, number, favorite, location, desc } = req.body;

    // Build Contact Object
    const contactFields = {};
    contactFields.user = req.user.id;
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (number) contactFields.number = number;
    if (favorite) contactFields.favorite = favorite;
    if (location) contactFields.location = location;
    if (desc) contactFields.desc = desc;

    try {
      let contact = await Contact.find({ user: req.user.id });

      // create
      contact = new Contact(contactFields);
      await contact.save();
      console.log("Contact Created");
      return res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   Get api/contact/id
// @desc    Get all Post of the Logged In User
// @access  Private
router.get("/:user_id", async (req, res) => {
  try {
    const contact = await Contact.find({ user: req.params.user_id });
    console.log("got all contact ");
    return res.json(contact);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no Contact of this user." });
    }
    return res.status(500).send("Server Error");
  }
});

// @route   Get api/contact/
// @desc    Delete single Contact
// @access  Private
router.delete("/:contact_id", auth, async (req, res) => {
  try {
    const contactId = new mongoose.Types.ObjectId(req.params.contact_id);

    const deleteResult = await Contact.deleteOne({ _id: contactId });

    console.log(deleteResult);
    console.log("Deleted contact");
    return res.json({ msg: "Contact Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async(req, res)=>{
  try {
    const data = await Contact.findById(req.params.id);
    console.log(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
