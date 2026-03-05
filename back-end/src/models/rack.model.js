import mongoose, { mongo } from "mongoose";


const rackSchema=new mongoose.Schema({
name:{
    type: String,
    required:true,
},
 description: {
      type: String,
      trim: true,
    },
aisle:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"aisle",
    required:true,
}

},{timestamps:true});

rackSchema.index({name : 1, aisle:1},{unique:true});

export default mongoose.model("Rack",rackSchema);
