const mongoose = require("mongoose");
const joi = require('joi');

const attachmentSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video", "pdf", "document", "audio", "other"],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function ValidateAttachment(obj) {
  const schema = joi.object({
    task: joi.string().required(),
    type: joi.string().valid(
      "image",
      "video",
      "pdf",
      "document",
      "audio",
      "other"
    ).required()
  });

  return schema.validate(obj);
}




const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = {Attachment,ValidateAttachment}