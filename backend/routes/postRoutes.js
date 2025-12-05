const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${baseName}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, authorizeRoles('admin', 'writer'), upload.single('featuredImage'), createPost);
router.put('/:id', protect, authorizeRoles('admin', 'writer'), upload.single('featuredImage'), updatePost);
router.delete('/:id', protect, authorizeRoles('admin', 'writer'), deletePost);

module.exports = router;
