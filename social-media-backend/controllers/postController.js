import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file?.path || '';

    const post = await Post.create({
      text,
      image,
      user: req.user._id
    });

    res.status(201).json({ success: true, message: 'Post created', post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Post creation failed' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name avatar');

    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name avatar');
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post || !post.user.equals(req.user._id))
      return res.status(403).json({ success: false, message: 'Unauthorized' });

    post.text = text || post.text;
    await post.save();

    res.status(200).json({ success: true, message: 'Post updated', post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.user.equals(req.user._id))
      return res.status(403).json({ success: false, message: 'Unauthorized' });

    await post.deleteOne();
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const liked = post.likes.includes(req.user._id);
    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.status(200).json({ success: true, message: liked ? 'Post unliked' : 'Post liked' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Like/unlike failed' });
  }
};

export const toggleSavePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const postId = req.params.id;

    const saved = user.savedPosts.includes(postId);
    if (saved) {
      user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
    } else {
      user.savedPosts.push(postId);
    }

    await user.save();
    res.status(200).json({ success: true, message: saved ? 'Post unsaved' : 'Post saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Save/unsave failed' });
  }
};

export const getMySavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedPosts',
      populate: { path: 'user', select: 'name avatar' }
    });

    res.status(200).json({ success: true, saved: user.savedPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching saved posts failed' });
  }
};

export const getPostStats = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const commentCount = await Comment.countDocuments({ post: req.params.id });

    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    res.status(200).json({
      success: true,
      stats: {
        likes: post.likes.length,
        comments: commentCount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch post stats' });
  }
};
