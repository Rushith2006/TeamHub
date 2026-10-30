import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["CREATOR", "MEMBER"],
      default: "MEMBER",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACCEPTED",
        "REJECTED",
        "WITHDRAWN",
      ],
      default: "PENDING",
    },

    requestedAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// One membership record per user per team.
membershipSchema.index(
  { team: 1, user: 1 },
  { unique: true }
);

// Find pending requests for a particular team.
membershipSchema.index({ team: 1, status: 1, createdAt: -1 });

// Find a user's active teams.
membershipSchema.index({ user: 1, status: 1, createdAt: -1 });

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;