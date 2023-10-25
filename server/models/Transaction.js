import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId : {
      type: String,
      // required : true,
    },
    cost : {
      type : String,
      // required : true,
    },
    products : {
      type : [mongoose.Types.ObjectId],
      of : Number,
      // required :true ,
    },
    type : {
      type : String,
      require : true,
      enum : ["Credited", "Debited"],
      default : "Credited"
    },
    invoice : {
      type : String,
      // required : true,
      default : "invoice",
    }
  },
  {timestamps : true}
)
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;