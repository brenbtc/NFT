const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creations: { type: String, required: true },
  owned: { type: Number, required: true },
  liked: { type: Number, required: true },
  about: { type: String, required: true },
});

module.exports = mongoose.model("artist", artistSchema);
