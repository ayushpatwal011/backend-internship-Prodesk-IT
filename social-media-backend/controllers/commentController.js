import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ success: false, message: 'Post not found' });

    const comment = await Comment.create({
      text,
      user: req.user._id,
      post: postId
    });

    res.status(201).json({ success: true, message: 'Comment added', comment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add comment' });
  }
};

export const getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment || !comment.user.equals(req.user._id))
      return res.status(403).json({ success: false, message: 'Unauthorized or not found' });

    comment.text = text || comment.text;
    await comment.save();

    res.status(200).json({ success: true, message: 'Comment updated', comment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update comment' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || !comment.user.equals(req.user._id))
      return res.status(403).json({ success: false, message: 'Unauthorized or not found' });

    await comment.deleteOne();
    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
};
