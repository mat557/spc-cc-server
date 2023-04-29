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
        res.send(err);
    }
}



module.exports.getBlogReactResponse = async(req,res) =>{
    try{
        const db = getDb();
        const email = req.params.email;
        const id = req.params.id;
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


// for feed 


module.exports.getCountPageItem = async(req,res) =>{
    try{
        const db = getDb();
        const result = await db.collection('feed').estimatedDocumentCount();
        res.json(result);
    }catch(err){
        res.send(err);
    }
}



module.exports.getCommnetCount = async(req,res) =>{
    try{
        const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await db.collection('feed')
      .find(query)
      .project({ comment: 1 })
      .toArray();
    if (!result.length) {
      return res.status(404).json({ message: 'Feed not found' });
    }
    const commentCount = result[0].comment.length;
    res.json( commentCount );
    }catch(err){
        res.send(err);
    }
}


module.exports.getFeedItem = async(req,res) =>{
    try{
        const db = getDb();
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const result = await db.collection('feed').find({}).skip(page*size).limit(size).toArray();
        res.json(result)
    }catch(err){
        res.send(err);
    }
}



module.exports.postSinglequestion = async(req,res) =>{
    try{
        const db = getDb();
        const data = req.body;
        const result = await db.collection('feed').insertOne(data);
        res.json(result);

    }catch(err){
        res.send(err);
    }
}




module.exports.postSingleReply = async(req,res) =>{
    try{
        const db = getDb();
        const id = req.params.id;
        const data = req.body;
        const query = {_id : ObjectId(id)}
        const updateDoc = {
            $push : {comment : data}
        }
        const result = await db.collection('feed').updateOne(query , updateDoc )
        res.json(result)
    }catch(err){
        res.send(err);
    }
}





module.exports.likeSingleQuestion = async(req,res) =>{
    try{
        const db = getDb();
        const id = req.params.id;
        const data = req.body;
        const query = {_id : ObjectId(id)}
        const updateDoc = {
            $push : {comment : data}
        }
        const result = await db.collection('feed').updateOne(query , updateDoc )
        res.json(result)
    }catch(err){
        res.send(err);
    }
}

module.exports.getFeedReply = async (req, res) => {
    try {
      const db = getDb();
      const id = req.params.id;
      const result = await db.collection("feed").find({ _id : ObjectId(id)}).toArray();
      res.json(result);
    } catch (err) {
      res.send(err);
    }
  };