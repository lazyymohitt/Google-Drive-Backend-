const express = require("express");
const router = express.Router();

// router.use(express.json())
// router.use(express.urlencoded({extended:true}))
const { body, validationResult } = require("express-validator");
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            errors:error.array(),
            message:"Invalid Data"
        })
    }

    console.log(error);
    res.send(error);
  }
);
module.exports = router;
