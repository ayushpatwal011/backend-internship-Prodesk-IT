import User from "../models/User.js";

export const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { bookId } = req.params;

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }

    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
