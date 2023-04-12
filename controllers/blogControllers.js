const { getDb } = require("../utils/dbConnect");const { ObjectId } = require("mongodb");


module.exports.getAllBlogs = async(req,res) =>{
    try{
        const db = getDb();
        const result = await db.collection('blogs').find().toArray();
        res.json(result);

    }catch(err){
        res.send(err);
    }
}


module.exports.postSingleBlog = async(req,res) =>{
    try{
        const db = getDb();
        const data = req.body;
        const result = await db.collection('blogs').insertOne(data);
        res.json(result);

    }catch(err){
        res.send(err);
    }
}


module.exports.deleteSingleBlog = async(req,res) =>{
    try{
        const db = getDb();
        const id = req.params.id;
        const query = { _id : ObjectId(id)};
        const data = await db.collection('blogs').deleteOne(query);
        res.json(data);
    }catch(err){
        res.send(err);
        console.log(err);
    }
}


module.exports.updateSingleBlog = async(req,res) =>{
    try{
        const db = getDb();
        const id = req.params.id;
        const query = {_id : ObjectId(id)};
        const data = req.body;
        const updateDoc = {
            $set: data,
        };
        const result = await db.collection('blogs').findOneAndUpdate(query, updateDoc);
        res.json(result);
    }catch(err){
        console.log(err)
    }
}