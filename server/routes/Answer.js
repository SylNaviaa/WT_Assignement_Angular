import express from 'express'
import auth from '../middlewares/auth.js';
import { postAnswer, deleteAnswer, voteAnswer, getMyAnswers, modifyAnswer, getNumberVoteAnswer } from '../controllers/Answers.js'

const router = express.Router();

router.patch('/post/:id', auth, postAnswer)
router.patch('/modify/:id', auth, modifyAnswer)
router.patch('/delete/:id', auth, deleteAnswer)
router.patch('/vote/:id', auth, voteAnswer)
router.get('/getMyAnswers/:id', auth, getMyAnswers)
router.get('/getNumberVoteAnswer/:id', getNumberVoteAnswer)

export default router