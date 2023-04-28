const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    state: {
      type: Number,
      required: false,
      default: 0,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.method("toJSON", function () {
  const { _id, __v, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("User", userSchema);
