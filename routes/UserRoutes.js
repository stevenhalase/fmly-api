const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');


router.get('/', UserController.list);
router.get('/:id', UserController.show);
router.post('/login', UserController.login);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

module.exports = router;