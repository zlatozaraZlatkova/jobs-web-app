const { Schema, model, Types } = require("mongoose");

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [5, "Description should be at least 5 characters long"],
      maxLength: [
        3000,
        "Description shouldn't contain more than 3000 characters ",
      ],
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
        "Email is invalid",
      ],
    },
    contactPhone: {
      type: String,
      required: true,
    },
    listOfOpenJobs: {
      type: [Types.ObjectId],
      require: true,
      ref: "Job",
      default: [],
    },
    listOfApplicants: {
      type: [Types.ObjectId],
      require: true,
      ref: "EmployeeProfile",
      default: [],
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

companySchema.index(
  { companyName: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const Company = model("Company", companySchema);

module.exports = Company;
