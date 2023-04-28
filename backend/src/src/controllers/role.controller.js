const { response } = require("express");
const { request } = require("express");
const Role = require("../database/models/role.model");

const createRole = async (req = request, res = response) => {
  try {
    const { name } = req.body;
    let role = await Role.findOne({ name });
    if (role) return res.status(404).json({ code: "MR1100" });
    role = new Role(req.body);
    await role.save();
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ code: "MR2000" });
  }
};

const getRoles = async (_, res = response) => {
  try {
    const roles = await Role.find({ state: 1 }).select({ name: 1 });
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ code: "MR2001" });
  }
};

const toggleRole = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) return res.status(404).json({ code: "MR1101" });
    await Role.findByIdAndUpdate(id, { state: !role.state });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ code: "MR2002" });
  }
};

module.exports = {
  createRole,
  getRoles,
  toggleRole,
};
