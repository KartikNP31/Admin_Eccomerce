import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mrpPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default : 0,
    },
    quantity: {
      type : Number,
      required : true,
      default : 0,
      min : 0,
    },
    tagline: {
      type : String,
    },
    imageMain: {
      data: Buffer,
      contentType: String,
      // required: true,
    },

    imageSub: {
      type: [
        {
          data: Buffer,
          contentType: String,
          // required: true,
        },
      ],
      // required: true,
      validate: [
        {
          validator: function (value) {
            return value.length >= 0 && value.length <= 10;
          },
          message: "imageSub can have a minimum of 0 and a maximum of 10 objects.",
        },
      ],
    },

    rating: {
      type : Number,
      default : 0,
      required : true,
      min :0,
      max : 5,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema);
export default Product;

