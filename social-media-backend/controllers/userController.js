import User from '../models/userModel.js';

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, message: 'User fetched', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, avatar },
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, message: 'User found', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
};

export const followUser = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const target = await User.findById(req.params.id);

    if (!target) return res.status(404).json({ success: false, message: 'User not found' });
    if (target._id.equals(me._id))
      return res.status(400).json({ success: false, message: 'Cannot follow yourself' });

    if (me.following.includes(target._id))
      return res.status(400).json({ success: false, message: 'Already following' });

    me.following.push(target._id);
    target.followers.push(me._id);

    await me.save();
    await target.save();

    res.status(200).json({ success: true, message: 'Followed user' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Follow failed' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const target = await User.findById(req.params.id);

    if (!target) return res.status(404).json({ success: false, message: 'User not found' });

    me.following = me.following.filter(id => id.toString() !== target.id);
    target.followers = target.followers.filter(id => id.toString() !== me.id);

    await me.save();
    await target.save();

    res.status(200).json({ success: true, message: 'Unfollowed user' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unfollow failed' });
  }
};

export const searchUsersByName = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.params.name, $options: 'i' }
    }).select('name avatar bio');

    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};
