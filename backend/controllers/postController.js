const Post = require('../models/Post');

const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean);
  }
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

exports.getPosts = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const filters = {};

    if (search) {
      filters.title = { $regex: search, $options: 'i' };
    }

    if (tag) {
      filters.tags = { $in: [tag] };
    }

    const posts = await Post.find(filters)
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email role');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const featuredImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const post = await Post.create({
      title,
      content,
      excerpt: content.substring(0, 200),
      tags: normalizeTags(tags),
      status: status || 'draft',
      featuredImage,
      author: req.user._id
    });

    const populatedPost = await post.populate('author', 'name email role');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Create post error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.user.role !== 'admin' && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const { title, content, tags, status } = req.body;

    if (title) post.title = title;
    if (content) {
      post.content = content;
      post.excerpt = content.substring(0, 200);
    }
    if (tags) {
      post.tags = normalizeTags(tags);
    }
    if (status) {
      post.status = status;
    }

    if (req.file) {
      post.featuredImage = `/uploads/${req.file.filename}`;
    }

    await post.save();

    const populatedPost = await post.populate('author', 'name email role');
    res.json(populatedPost);
  } catch (error) {
    console.error('Update post error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.user.role !== 'admin' && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Delete post error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
