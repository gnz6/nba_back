const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")

const ReviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"product"
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    value: {
      type: Number,
      validator: {
        min: 1,
        max: 5,
      },
      default:1
    },
    comment: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

ReviewSchema.statics.findAllData = function () {
  const joinReviews = this.aggregate([
    {
      $lookup: {
        from: "product",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);
  return joinReviews;
};
ReviewSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("reviews", ReviewSchema);
