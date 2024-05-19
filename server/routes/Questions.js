import express from 'express'
import auth from '../middlewares/auth.js'
import { askQuestion, deleteQuestion, getAllQuestions, getQuestionsByTitle, getQuestionById, getMyQuestions } from '../controllers/Questions.js'

const router = express.Router()

router.post('/ask', auth, askQuestion)
router.get('/get', getAllQuestions)
router.get('/get/:id', getQuestionById)
router.delete('/delete/:id', auth, deleteQuestion)
router.get('/getQuestionsByTitle/:title', getQuestionsByTitle)
router.get('/getMyQuestions', auth, getMyQuestions)

export default router