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
router.get('/admin-actualite', requireAuth, AdminController.actualite);
router.get('/admin-add-actualite', requireAuth, AdminController.viewaddactu);
router.post('/admin-search-actu', requireAuth, AdminController.search);
router.post('/admin-add-actualite', requireAuth, upload.single('image'), AdminController.addactualite);
router.get('/admin-edit-actualite/:id', requireAuth, AdminController.vieweditactualite);
router.post('/admin-edit-actualite/:id', requireAuth, upload.single('image'), AdminController.editactualite);
router.post('/admin-delete-actu/:id', requireAuth, AdminController.deleteactu);


module.exports = router;