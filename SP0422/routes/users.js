import express from 'express';

import {login , signup ,allUsers} from '../controllers/auth.js'
// import {allUsers} from '../controllers/allusers.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/allUsers', allUsers)

export default router;
