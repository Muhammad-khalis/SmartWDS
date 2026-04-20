import mongoose from "mongoose";


const aisleSchema= new mongoose.Schema({

  name:{
    type:String,
    required:[true, "Aisle name is required"],
  },
  zone:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"zone",
    required:[true, "Zone is required"],
  },
    description: {
      type: String,
      trim: true,
    },


},{timestamps:true});

aisleSchema.index({name:1,zone:1},{unique:true});

export default mongoose.model("aisle",aisleSchema);