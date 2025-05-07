const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    switch (req.baseUrl) {
      case "/api/blogs":
        uploadPath = "uploads/blogs/";
        break;
      case "/api/auth":
        uploadPath = "uploads/users/";
        break;
      default:
        uploadPath = "uploads/";
        break;
    }

    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    let fileExt = file.originalname.split(".").pop();
    let fileName = Date.now() + "." + fileExt;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
});

module.exports = { upload };
