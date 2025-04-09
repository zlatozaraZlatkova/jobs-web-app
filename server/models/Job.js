const { Schema, model, Types } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [5, "Title should be at least 5 characters long"],
      maxLength: [150, "Title shouldn't contain more than 150 characters "],
      lowercase: true,
    },
    techStack: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["html", "css", "javascript", "react", "angular", "vue", "next.js", "typescript",
        "java", ".net", "php", "python", "ruby", "go", "node.js"],
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["full-time", "part-time", "remote"],
    },
    technologies: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["frontend", "backend"],
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
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    company: {
      type: Types.ObjectId,
      required: true,
      ref: "Company",
    },
    pinnedByEmployees: {
      type: [Types.ObjectId],
      required: true,
      ref: "EmployeeProfile",
      default: [],
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Job = model("Job", jobSchema);
module.exports = Job;
