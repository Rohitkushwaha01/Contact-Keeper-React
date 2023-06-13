const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const User = require("../../models/User");

// @route  POST api/auth
// @desc   Login User
// @access Public

router.post(
  "/",
  [
    check("email", "Email is Required").isEmail(),
    check(
      "password",
      "Password is Required"
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User Does not exists" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      // return jsonWebToken
      const payload = {
        user: {
            id: user.id,
        }
      }

      jwt.sign(payload, config.get("jwtToken"), {expiresIn: 36000}, (err, token )=>{
        if(err){
            throw err;
        }
        else {
            res.json({token, payload});
        }
      });
      console.log("logged in")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server Error");
    }
  }
);

module.exports = router;