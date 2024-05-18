import express from 'express'
import auth from '../middlewares/auth.js';
import { postAnswer, deleteAnswer, voteAnswer } from '../controllers/Answers.js'

const router = express.Router();

router.patch('/post/:id', auth, postAnswer)
router.patch('/delete/:id', auth, deleteAnswer)
router.patch('/vote/:id', auth, voteAnswer)

export default router