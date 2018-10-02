const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController.js');


router.get('/', PostController.list);
router.get('/:id', PostController.show);
router.post('/', PostController.create);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.remove);

module.exports = router;