import express from 'express'
import auth from '../middlewares/auth.js';
import { postAnswer, deleteAnswer, voteAnswer, getMyAnswers, modifyAnswer } from '../controllers/Answers.js'

const router = express.Router();

router.patch('/post/:id', auth, postAnswer)
router.patch('/modify/:id', auth, modifyAnswer)
router.patch('/delete/:id', auth, deleteAnswer)
router.patch('/vote/:id', auth, voteAnswer)
router.get('/getMyAnswers/:id', auth, getMyAnswers)

export default router