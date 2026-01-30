const User = require("../models/User");

// -------------------------------
// GET CURRENT LOGGED IN USER
// -------------------------------
exports.getMyProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("_id name email role phone status");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// -------------------------------
// UPDATE PROFILE (OPTIONAL)
// -------------------------------
exports.updateMyProfile = async (req, res) => {
  try {

    const { name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select("_id name email role phone status");

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
