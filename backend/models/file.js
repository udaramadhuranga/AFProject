const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    paid: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
  
);

const File = mongoose.model('File', fileSchema);

module.exports = File;