const { Schema, model, Types } = require("mongoose");

const employerProfileSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      required: true,
      ref: "Company",
    },
    postedJobs: {
      type: [Types.ObjectId],
      required: true,
      ref: "Job",
      default: []
    },
    receivedApplications: {
      type: [Types.ObjectId],
      required: true,
      ref: "EmployeeProfile",
      default: []
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const EmployerProfile = model("EmployerProfile", employerProfileSchema);

module.exports = EmployerProfile;
