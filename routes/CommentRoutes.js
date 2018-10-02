const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController.js');


router.get('/', CommentController.list);
router.get('/:id', CommentController.show);
router.post('/', CommentController.create);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.remove);

module.exports = router;