import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },

    type: {
      type: String,
      enum: [
        "JOIN_REQUEST",
        "JOIN_APPROVED",
        "JOIN_REJECTED",
        "NEW_MESSAGE",
        "TEAM_UPDATE",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      maxlength: 100,
    },

    body: {
      type: String,
      required: true,
      maxlength: 500,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;