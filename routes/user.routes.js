const express = require("express");
const router = express.Router();
 const userModel =  require('../models/user.model')

 const bcrypt =  require('bcrypt')
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  res.render("register");
});
const jwt = require('jsonwebtoken')

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            errors:error.array(),
            message:"Invalid Data"
        })
    }

   const {username,email,password} =  req.body

   const hashpass = await bcrypt.hash(password,10)
   const newuser = await userModel.create({
    email,
    password:hashpass,
    username
   })
   res.json(newuser)
  }
);


router.get('/login',(req,res)=>{
  res.render('login')
})

router.post("/login",
  body('username').trim().isLength({min:3}),
  body('password').trim().isLength({min:5}),
  async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        error:errors.array(),
        message:'Invalid Date'
      })
    }

    const {username,password} = req.body


    const user  = await userModel.findOne({
      username:username
    })

    if(!user){
      return res.status(400).json({
        message:"Username and Passowrd are Incorrect"
      })
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({
        message:"Username and Passwords are Incorrect "
      })
    }
    const token= jwt.sign({
      userId:user._id,
      email:user.email,
      username:user.username

    },process.env.JWT_SECRET)
    res.cookie('token',token)
    res.send("LoggedIN")
  }


  
)
module.exports = router;
