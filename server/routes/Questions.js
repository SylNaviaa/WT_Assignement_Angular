import express from 'express'
import auth from '../middlewares/auth.js'
import { askQuestion, deleteQuestion, getAllQuestions, getQuestionsByTitle } from '../controllers/Questions.js'

const router = express.Router()

router.post('/ask', auth, askQuestion)
router.get('/get', getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion)
router.get('/getQuestionsByTitle/:title', getQuestionsByTitle)

export default router