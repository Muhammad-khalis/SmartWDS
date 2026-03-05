import mongoose from "mongoose";


const warehouseSchema= new mongoose.Schema({
name:{
    type:String,
    required : true,

},
location:{
    type : String,
    required : true,

},
discription:{
    type : String,
},
createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

},{timestamps : true});

// index for faster search
warehouseSchema.index({name : 1});

export default mongoose.model("Warehouse",warehouseSchema);