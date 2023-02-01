const express=require("express");
const router=express.Router();
const bookmodule=require("../Module/bookmodule");

router.get("/get",bookmodule.getbooks);
router.get('/get/:id',bookmodule.findById);
router.post("/post",bookmodule.createbook);
router.put("/update/:id",bookmodule.updatebook);
router.delete('/delete/:id',bookmodule.deletebook);

module.exports=router;