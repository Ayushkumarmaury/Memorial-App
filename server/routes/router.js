const express = require('express');

const router = new express.Router();

const multer = require("multer");

const users = require("../model/usersSchema");


//img storage path
const imgconfig = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null,"./uploads");
    },
    filename:(req, file, callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`);
    }
})

//img filter
const isImage = (req, file, callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }else{
        callback(new Error("only image is allowed."));
    }
}


const upload = multer({
    storage: imgconfig,
    fileFilter:isImage
})


//user register
router.post("/register", upload.single("photo")  , async(req, res) => {
        const {filename} = req.file;
        const {fname} = req.body;

        if(!fname || !filename ){
            return res.status(401).json({status:401, message:"fill all the data."});
        }

        try{
            const userdata = new users({
                fname:fname,
                imgpath:filename,

            });

            const finaldata = await userdata.save();

            return res.status(201).json({status:201, finaldata});

        }catch(error){
             return res.status(401).json({status:401, error});
        }

})


//user data get

router.get("/getdata", async(req,res)=>{
    try{
        const getUser = await users.find();

        return res.status(201).json({status:201, getUser})
    }catch(error){
        return res.status(401).json({status:401, error})
    }
});



//delete user data
router.delete("/:id", async(req, res)=>{
    try{

        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id});
        return res.status(201).json({status:201, deleteUser});

    }catch(error){

        return res.status(401).json({status:401, error});
        
    }
})

//update user data

router.get("/update/:id", async(req, res)=>{
    try{
        const userData = await users.find();

        return res.status(201).json({status:201, userData})
    }catch(error){
        return res.status(401).json({status:401, error})
    }
})





router.put("/:id", async(req, res)=>{
    try{

        const {id} = req.params;
        const updateUserData = req.body;
        const updateUser = await users.findByIdAndUpdate({_id:id}, {$set:updateUserData});
        
        return res.status(201).json({status:201, updateUser});

    }catch(error){

        return res.status(401).json({status:401, error});
        
    }
})


module.exports = router;