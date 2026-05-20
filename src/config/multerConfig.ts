import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, path.join(__dirname, "../uploads/images"));
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, path.join(__dirname, "../uploads/videos"));
    } else if (file.mimetype.startsWith("application/pdf")) {
      cb(null, path.join(__dirname, "../uploads/documents"));
    } else {
      cb(new Error("Tipo de arquivo não suportado"), "");
    }
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const dateString = now.toISOString().replace(/[-:T]/g, '').slice(0, 15);
    const time = now.getTime();

    const extension = path.extname(file.originalname);

    cb(null, `${dateString}_${time}${extension}`);
  }
});

export const imageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de imagem são permitidos"));
    }
  }
})

export const videoUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de vídeo são permitidos"));
    }
  }
})

export const documentUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("application/pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos PDF são permitidos"));
    }
  }
});
