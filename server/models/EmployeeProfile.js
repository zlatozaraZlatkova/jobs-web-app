const { Schema, model, Types } = require("mongoose");

const URL_REGEX = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

const employeeProfileSchema = new Schema(
  {
    company: {
      type: String,
    },
    website: {
      type: String,
      validator: (value) => URL_REGEX.test(value),
      message: (props) => {
        return `${props.value} is not a valid URL`;
      },
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    githubUsername: { type: String },
    socialMedia: {
      linkedin: {
        type: String,
        validator: (value) => URL_REGEX.test(value),
        message: (props) => {
          return `${props.value} is not a valid URL`;
        },
      },
    },
    appliedJobs: {
      type: [Types.ObjectId],
      required: true,
      ref: "Job",
      default: []
    },
    pinnedJobList: {
      type: [Types.ObjectId],
      required: true,
      ref: "Job",
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


const EmployeeProfile = model("EmployeeProfile", employeeProfileSchema);

module.exports = EmployeeProfile;
