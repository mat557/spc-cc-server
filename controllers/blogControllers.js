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



module.exports.getSingleBlogs = async(req,res) =>{
    try{
        const db = getDb();
        const id = req.params.id;
        const query = { _id : ObjectId(id)};
        const result = await db.collection('blogs').findOne(query);
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



module.exports.getBlogReactResponse = async(req,res) =>{
    try{
        const db = getDb();
        const email = req.params.email;
        const id = req.params.id;
        console.log(id,email)
        const query = {_id : ObjectId(id)};
        const updateDoc = {
            $push: {like : email},
        };
        const result = await db.collection('blogs').updateOne(query,updateDoc);
        res.json(result)


        // const exist = await db.collection('blogs').findOne({
        //     $and: [
        //         { _id   : ObjectId(id) },
        //         { like  : email }
        //     ]
        // });

        // res.json(exist)
        // if(!exist){
        //     const updateDoc = {
        //         $push : {like : email }
        //     }
        //     const query = {
        //         _id : ObjectId(id)
        //     }
        //     const result = await db.collection('users').updateOne(query,updateDoc)

        //     res.json(json,"true")
        // }else{
        //     res.json("not found","false")
        // }
    }catch(err){
        res.send(err);
    }
}