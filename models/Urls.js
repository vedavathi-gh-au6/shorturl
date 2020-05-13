var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlsSchema = new Schema(
  {
    longurl: {
      type: String,
      required: true
    },
    shorturl: {
      type: String,
     
    },
    count: {
      type: Number,
      default: 0
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

var Urls = mongoose.model("url", urlsSchema);

module.exports = Urls;

