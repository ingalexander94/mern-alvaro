const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../database/models/user.model");
const Role = require("../database/models/role.model");
const { generateToken } = require("../utils/jwt");
const {
  transporter,
  emailActivateAccount,
  emailForgotPassword,
} = require("../utils/nodemailer");

const register = async (req = request, res = response) => {
  try {
    const { email, password, role } = req.body;
    let userRole = await Role.findById(role);
    if (!userRole || userRole.state === 0)
      return res.status(404).json({ code: "MA1100" });
    let user = await User.findOne({ email, role: userRole });
    if (user) {
      if (user.state === 1) return res.status(404).json({ code: "MA1101" });
      const token = await generateToken(user.id, "5m");
      await transporter.sendMail(emailActivateAccount(email, token));
      return res.status(404).json({ code: "MA1105" });
    } else {
      user = new User(req.body);
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);
      user.role = userRole;
      await user.save();
      const token = await generateToken(user.id, "5m");
      await transporter.sendMail(emailActivateAccount(email, token));
      return res.status(201).json();
    }
  } catch (error) {
    return res.status(500).json({ code: "MA2000" });
  }
};

const activate = async (req = request, res = response) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ code: "MA1102" });
    user.state = 1;
    await user.save();
    return res.redirect(301, `${process.env.ORIGIN_URL}/auth/activate`);
  } catch (error) {
    return res.status(500).json({ code: "MA2001" });
  }
};

const login = async (req = request, res = response) => {
  try {
    const { email, password, role } = req.body;
    let userRole = await Role.findById(role);
    if (!userRole || userRole.state === 0)
      return res.status(404).json({ code: "MA1100" });
    let user = await User.findOne({ email, role }).populate("role");
    if (!user) return res.status(404).json({ code: "MA1102" });
    if (user.state === 0) return res.status(404).json({ code: "MA1103" });
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(404).json({ code: "MA1104" });
    const token = await generateToken(user.id);
    const words = user.fullname.split(" ");
    let letters =
      words.length == 2
        ? `${words[0].charAt(0)}${words[1].charAt(0)}`
        : words.reduce(
            (acc, cur, index) => (acc += index % 2 === 0 ? cur.charAt(0) : ""),
            ""
          );
    return res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
      role: user.role.name,
      idRole: user.role.id,
      initials: letters.toUpperCase(),
      token,
    });
  } catch (error) {
    return res.status(500).json({ code: "MA2002" });
  }
};

const renew = async (req = request, res = response) => {
  try {
    const { id } = req;
    const user = await User.findById(id).populate("role");
    if (!user) return res.status(404).json({ code: "MA1102" });
    if (user.state === 0) return res.status(404).json({ code: "MA1103" });
    const token = await generateToken(id);
    const words = user.fullname.split(" ");
    let letters =
      words.length == 2
        ? `${words[0].charAt(0)}${words[1].charAt(0)}`
        : words.reduce(
            (acc, cur, index) => (acc += index % 2 === 0 ? cur.charAt(0) : ""),
            ""
          );
    return res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
      role: user.role.name,
      idRole: user.role.id,
      initials: letters.toUpperCase(),
      token,
    });
  } catch (error) {
    return res.status(500).json({ code: "MA2003" });
  }
};

const forgot = async (req = request, res = response) => {
  try {
    const { email, role } = req.body;
    let userRole = await Role.findById(role);
    if (!userRole || userRole.state === 0)
      return res.status(404).json({ code: "MA1100" });
    const user = await User.findOne({ role, email });
    if (!user) return res.status(404).json({ code: "MA1102" });
    if (user.state === 0) return res.status(404).json({ code: "MA1103" });
    const token = await generateToken(user.id, "5m");
    await transporter.sendMail(emailForgotPassword(email, token));
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ code: "MA2004" });
  }
};

const recovery = async (req = request, res = response) => {
  try {
    const { id } = req;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ code: "MA1102" });
    if (user.state === 0) return res.status(404).json({ code: "MA1103" });
    const { newPassword } = req.body;
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(newPassword, salt);
    await user.save();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ code: "MA2005" });
  }
};

module.exports = {
  register,
  activate,
  login,
  renew,
  forgot,
  recovery,
};
