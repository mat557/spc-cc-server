const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.putSingleCourse = async(req,res) =>{
    try{
        const db = getDb();
        const data = req.body;
        const result = await db.collection('courses').insertOne(data);
        res.json(result)

    }catch(err){
        console.log(err);
    }
} 

module.exports.getAllCourses = async(req,res) =>{
    try{
        const db = getDb();
        const result = await db.collection('courses').find().toArray();
        res.json(result)
    }catch(err){
        res.send(err)
    }
}


module.exports.getSingleCourse = async(req,res) =>{
    try{
        const db = getDb();
        const id = req.params.id;
        const query = {_id : ObjectId(id)};
        const result = await db.collection('courses').findOne(query);
        res.json(result);
    }catch(err){
        console.log(err);
    }
}


module.exports.deleteSingleCourse = async(req,res) =>{
    try{
        const id = req.params.id;
        const db = getDb();
        const query = {_id : ObjectId(id)};
        const result = await db.collection('courses').deleteOne(query);
        res.json({ result , "message":"The requested course was deleted successfully!" }); 
    }catch(err){
        console.log("The error",err);
    }
}