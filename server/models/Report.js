import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: String,
      required: true,
      index: true,
    },
    reportedUserId: {
      type: String,
      required: true,
      index: true,
    },
    reason: {
      type: String,
      required: true,
      enum: [
        "Harassment",
        "Spam",
        "Inappropriate Content",
        "Fake Listing",
        "Safety Concern",
        "Other",
      ],
    },
    details: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "dismissed", "actioned"],
      default: "pending",
      index: true,
    },
    actionTaken: {
      type: String,
      enum: ["none", "warned", "suspended", "banned"],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
