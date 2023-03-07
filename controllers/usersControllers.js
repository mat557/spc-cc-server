const { getDb } = require("../utils/dbConnect");

module.exports.getAllUsers = async(req,res) =>{
    try{
        const db = getDb();
        const result = await db.collection('users').find().toArray();
        res.send(result);
    }catch(err){
        console.log(err.message)
    }
}


module.exports.getSingleUser = async(req,res) =>{
    try{
        const db = getDb();
        const email = req.params.email;
        const result = await db.collection('users').findOne({ email : email });
        res.json(result);
    }
    catch(err){
        console.log(err.message);
    }
}


module.exports.putSingleUser = async(req,res) =>{
    try{
        const db = getDb();
        const data = req.body;
        const result = await db.collection('users').insertOne(data);
        res.send(result);
    }catch(err){
        console.log(err.message)
    }
}

