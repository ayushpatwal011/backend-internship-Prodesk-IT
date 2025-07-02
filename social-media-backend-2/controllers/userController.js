import User from "../models/User.js";

// GET Current User Profile
export const getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE Profile (name, bio, avatar)
export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (bio) user.bio = bio;

    // If avatar uploaded
    if (req.file) {
      if (user.avatar?.public_id) {
        // delete old image
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      user.avatar = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  FOLLOW a user
export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ success: false, message: "Already following this user" });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: `You are now following ${userToFollow.name}`,
    });
  } catch (error) {
    console.error("Follow Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UNFOLLOW a user
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
      message: `You have unfollowed ${userToUnfollow.name}`,
    });
  } catch (error) {
    console.error("Unfollow Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  GET another user's profile by ID
export const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get User Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
