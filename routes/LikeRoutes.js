const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/LikeController.js');


router.get('/', LikeController.list);
router.get('/:id', LikeController.show);
router.post('/', LikeController.create);
router.put('/:id', LikeController.update);
router.delete('/:id', LikeController.remove);

module.exports = router;