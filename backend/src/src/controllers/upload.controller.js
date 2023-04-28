const { request, response } = require("express");
const path = require("path");
const fs = require("fs");
const User = require("../database/models/user.model");
const s3 = require("../utils/s3");

const uploadAvatar = async (req = request, res = response) => {
  try {
    let result;
    const { id } = req;
    const { avatar } = req.files;
    if (!avatar) return res.status(400).json({ code: "MU1100" });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ code: "MA1102" });
    if (user.state === 0) return res.status(404).json({ code: "MA1103" });
    if (user.avatar) {
      result = await s3.deleteFile(user.avatar);
      if (result.$metadata.httpStatusCode !== 204)
        return res.status(400).json({ code: "MU1102" });
    }
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const extension = path.extname(avatar.name);
    const filename = `avatar_${uniqueSuffix}${extension}`;
    result = await s3.uploadFile(filename, avatar.mimetype, avatar.data);
    if (result.$metadata.httpStatusCode !== 200)
      return res.status(400).json({ code: "MU1101" });
    user.avatar = filename;
    await user.save();
    return res.status(200).json({ avatar: filename });
  } catch (error) {
    return res.status(500).json({ code: "MU2000" });
  }
};

const deleteAvatar = async (req = request, res = response) => {
  try {
    const { id } = req;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ code: "MA1102" });
    if (user.state === 0) return res.status(404).json({ code: "MA1103" });
    if (user.avatar) {
      const result = await s3.deleteFile(user.avatar);
      if (result.$metadata.httpStatusCode !== 204)
        return res.status(400).json({ code: "MU1102" });
      user.avatar = null;
      await user.save();
      return res.status(200).json();
    }
    return res.status(400).json({ code: "MU1103" });
  } catch (error) {
    return res.status(500).json({ code: "MU2001" });
  }
};

module.exports = {
  uploadAvatar,
  deleteAvatar,
};
