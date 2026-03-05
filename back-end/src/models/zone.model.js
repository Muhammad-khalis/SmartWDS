import mongoose from "mongoose";


const  zoneSchema= new mongoose.Schema({
name:{
    type: String,
    required : true,

},
warehouse:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Warehouse",
    required:true,
}

},{timestamps:true});

// Prevent duplicate zone name inside same warehouse

zoneSchema.index({name : 1, warehouse:1},{unique:true});

export default mongoose.model("zone",zoneSchema)