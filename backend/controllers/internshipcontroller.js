const Internship = require("../models/Internship");

exports.createInternship = async (req, res) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    const internship = new Internship(payload);
    await internship.save();
    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate("createdBy", "name email");
    if (!internship) return res.status(404).json({ msg: "Not found" });
    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ msg: "Not found" });
    if (String(internship.createdBy) !== String(req.user._id)) return res.status(403).json({ msg: "Forbidden" });

    Object.assign(internship, req.body);
    await internship.save();
    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ msg: "Not found" });
    if (String(internship.createdBy) !== String(req.user._id)) return res.status(403).json({ msg: "Forbidden" });

    await internship.remove();
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
