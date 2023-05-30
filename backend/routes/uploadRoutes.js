import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

// If production, use Render server's data folder, else use local uploads folder
const uploadFolder =
  process.env.NODE_ENV === 'production' ? '/var/data/uploads/' : 'uploads/';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadFolder);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: 'Images only!' });
  }
}

const upload = multer({
  storage,
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded successfully',
    image: `/${req.file.path}`,
  });
});

export default router;
