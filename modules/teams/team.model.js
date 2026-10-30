import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      minlength: 3,
      maxlength: 80,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "General",
    },

    maxMembers: {
      type: Number,
      min: 2,
      max: 100,
      default: 10,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

teamSchema.index({ creator: 1, createdAt: -1 });
teamSchema.index({ name: 1 }, { unique: true });
const Team = mongoose.model("Team", teamSchema);

export default Team;