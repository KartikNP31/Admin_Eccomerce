import express from 'express';
import {getProducts} from '../controller/client.js';
import {getCustomers, getTransactions} from '../controller/client.js'
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';


// const multer = multer();
// const path = path();

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadSingle = multer({ storage: storage }).single('productMainImage');
const uploadMultiple = multer({ storage: storage }).array('productSubImages', 10);

router.post('/addProduct', async (req, res) => {
  try {
    uploadSingle(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: 'Error uploading main image' });
      }

      const mainImage = req.file; // Access the uploaded main image from req.file

      uploadMultiple(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ message: 'Error uploading sub images' });
        }

        const subImages = req.files; // Access the uploaded sub images from req.files

        const {
          category,
          name,
          description,
          mrpPrice,
          discount,
          quantity,
          tagline,
          rating,
        } = req.body;

        const product = new Product({
          category,
          name,
          description,
          mrpPrice,
          discount,
          quantity,
          tagline,
          rating,
          imageMain: {
            data: mainImage.buffer,
            contentType: mainImage.mimetype,
          },
          imageSub: subImages.map((image) => ({
            data: image.buffer,
            contentType: image.mimetype,
          })),
        });

        await product.save();

        return res.status(201).json({ message: 'Product created successfully' });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});



router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);


export default router;