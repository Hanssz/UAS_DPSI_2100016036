const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'hanif',
  api_key: "v977232142149997v",
  api_secret: "4gWXH_sV_5A-7D1r3L4NoBnRmfk",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uas_dpsi_2100016036', 
    format: async (req, file) => 'png',
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
