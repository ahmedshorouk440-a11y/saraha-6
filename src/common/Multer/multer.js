
import multer from "multer";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: "Uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid format"), false);
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter });
};