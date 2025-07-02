import Post from "../models/Post.js";
import User from "../models/User.js";

//  CREATE a post
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    let image = {};

    if (req.file) {
      image = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    const newPost = await Post.create({
      caption,
      image,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET all posts (Feed)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name avatar")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Get All Posts Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  LIKE / UNLIKE a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const userId = req.user._id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
      return res.status(200).json({ success: true, message: "Post unliked" });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    console.error("Like Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  COMMENT on a post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    res.status(200).json({ success: true, message: "Comment added" });
  } catch (error) {
    console.error("Comment Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  DELETE a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized or not found" });
    }

    await post.remove();

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.error("Delete Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  SAVE / UNSAVE a post
export const toggleSavePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const postId = req.params.id;

    const alreadySaved = user.savedPosts.includes(postId);

    if (alreadySaved) {
      user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
      await user.save();
      return res.status(200).json({ success: true, message: "Post unsaved" });
    } else {
      user.savedPosts.push(postId);
      await user.save();
      return res.status(200).json({ success: true, message: "Post saved" });
    }
  } catch (error) {
    console.error("Save Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// SHARE a post
export const sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (!post.shares.includes(req.user._id)) {
      post.shares.push(req.user._id);
      await post.save();
    }

    res.status(200).json({ success: true, message: "Post shared" });
  } catch (error) {
    console.error("Share Post Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  GET posts by user
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Get User Posts Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
