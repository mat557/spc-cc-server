const { ObjectId } = require("mongodb");
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
        const newData = {
            email  :  data.email,
            number :  data.number,
            name   :  data.name,
            id     :  [],
            role   :  [],
            marks  :  {}
          };
        const result = await db.collection('users').insertOne(newData);
        res.send(result);
    }catch(err){
        console.log(err.message)
    }
}

module.exports.countCommentNumber = async(req,res) =>{
    try{
        const db = getDb()
        const result = await db.collection('ratings').estimatedDocumentCount()
        
        // console.log(result)
        res.json(result)
    }catch(err){
        console.log(err)
    }
}

module.exports.getUserComments = async(req,res) => {
    try{
        const db = getDb();
        const { page } = req.params 

        const size = 3
        // console.log(parseInt(page))
        let newVal = (parseInt(page))*size < 0 ? 0 : (parseInt(page))*size
        const skip = newVal

        // console.log(skip)
        
        const result = await db.collection('ratings').find({}).skip(skip).limit(size).toArray()
        
        // console.log(result)
        res.status(200).json(result) 
    }catch(err){
        console.log(err)
    }
}

module.exports.addUserComment = async(req,res) => {
    try{
        const db = getDb()
        const { email , ratings , name , cmnt , role} = req.body
        const comment = {
            email : email,
            name : name,
            role : role,
            ratings : ratings,
            cmnt : cmnt,
        }
        // console.log(req.body)
        const result  = await db.collection('ratings').insertOne(comment)
        // console.log(result)
        res.status(200).json(result)
    }catch(err){
        console.log(err)
    }
}

module.exports.promoteUserBLog = async(req,res) =>{
    try{
        const db = getDb();
        const email = req.params.email;
        const query = { email : email }
        const updateDoc = {
            $push : {
                role : "blogger"
            }
        }
        const result = await db.collection('users').updateOne(query , updateDoc )
        res.json(result)
    }catch(err){
        console.log(err);
    }
}


module.exports.getEnrolledStudentByCourse = async(req,res) =>{
    try{
        const db = getDb();
        const tag = req.params.id;
        const query = { id: tag };
        const options = {
            projection: { _id: 1, email: 1, name: 1 },
        };
        const result = await db.collection('users').find(query,options).toArray();
        res.json(result)
    }catch(err){
        res.send(err)
    }
}


    module.exports.postStudentExamsMarks = async(req,res) =>{
        try{
            const db = getDb();
            const id = req.params.id;
            const length = req.params.length;
            const values = req.body;
            let i;
            let n = -1 , count = 0; 

            // console.log(values)

            for (const property in values) {
                for(i = 0 ; i < length ; i++){
                    if(property[5] == i){  
                        const recievedValues = {
                            'cq__m' : values[`cq_m-${i}`],
                            'mcq_m' : values[`mcqm-${i}`],
                            'exm_n' : values[`exNo-${i}`],
                            'total' : Number(values[`cq_m-${i}`]) + Number(values[`mcqm-${i}`]),
                            'max'   : 40
                        } 
                        
                        const updateDoc = {
                                $push :{
                                    [`marks.${id}`] :recievedValues
                            }
                        }
    
                        if(i != n){
                            const query = { email :  values[property]}
                            const result = await db.collection('users').updateOne( query , updateDoc );
                            if(result.acknowledged){
                                count++;
                            }
                            console.log(result)
                            n = i;
                        }
                    }
                }
            }
            console.log(count,length)
            res.json({message : 'Marks added to databse'})
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    } 
