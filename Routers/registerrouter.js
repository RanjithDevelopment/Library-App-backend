const express = require('express');
const register=require('../Module/registermodule');

const router=express.Router();
router.post('/signup',register.signup);
router.post('/signin',register.sigin);
module.exports=router;