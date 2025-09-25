const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    const course = new Course(payload);
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
