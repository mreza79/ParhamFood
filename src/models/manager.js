const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require("./restaurant");

const managerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (
          !validator.isStrongPassword(value, [
            (minLength = 8),
            (minLowercase = 1),
            (minUppercase = 1),
            (minNumbers = 1),
            (minSymbols = 1),
          ])
        ) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    restaurant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant"
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// managerSchema.virtual("restaurants", {
//   ref: "Restaurant",
//   localField: "_id",
//   foreignField: "manager",
// });

//Object to json
managerSchema.methods.toJSON = function () {
  const manager = this;
  const managerObject = manager.toObject();

  delete managerObject.password;
  delete managerObject.tokens;
  delete managerObject.avatar;

  return managerObject;
};

//Generate JWT
managerSchema.methods.generateAuthToken = async function () {
  const manager = this;
  const token = jwt.sign(
    { _id: manager._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "30 minutes" }
  );

  manager.tokens = manager.tokens.concat({ token });
  await manager.save();

  return token;
};

//Find manager in DB
managerSchema.statics.findByCredentials = async (email, password) => {
  const manager = await Manager.findOne({ email });

  if (!manager) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, manager.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return manager;
};

//hash password before adding to db
managerSchema.pre("save", async function (next) {
  const manager = this;

  if (manager.isModified("password")) {
    manager.password = await bcrypt.hash(manager.password, 8);
  }
  next();
});

//remove manager and every restaurant that he has own
managerSchema.pre("remove", async function (next) {
  const manager = this;
  await Restaurant.deleteMany({ owner: manager._id });
  next();
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
