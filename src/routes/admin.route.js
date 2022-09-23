const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const requireAuth = require('../middleware/authMiddleware');

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets/upload/');     // './public/images/' directory name where save the file
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

const AdminController = require('../controllers/AdminController');

router.get('/admin', requireAuth, AdminController.index);
router.get('/admin-actualite', AdminController.actualite);
router.get('/admin-add-actualite', AdminController.viewaddactu);
router.post('/admin-search-actu', AdminController.search);
router.post('/admin-add-actualite', upload.single('image'), AdminController.addactualite);
router.get('/admin-edit-actualite/:id', AdminController.vieweditactualite);
router.post('/admin-edit-actualite/:id', upload.single('image'), AdminController.editactualite);
router.post('/admin-delete-actu/:id', AdminController.deleteactu);


module.exports = router;