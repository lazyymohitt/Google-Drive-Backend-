const express = require('express')


const router =  express.Router()


router.get('/home',(req,res)=>{
    res.render('login')
})


module.exports = router

