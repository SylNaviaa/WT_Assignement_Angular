import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerBody } = req.body;
    const { userId } = req;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('question unavailable...');
        }
        const question = await Questions.findById(_id)
        const newAnswer = {
            answerBody,
            userAnswered: req.userName,
            userId,
            answeredOn: new Date().toISOString()
        }
        question.answer.push(newAnswer)
        question.noOfAnswers = question.answer.length
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json(question)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId } = req.body;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const answer = question.answer.find((ans) => ans._id == answerId)
        if (answer.userId !== userId) {
            return res.status(401).send('You can delete only your answers...')
        }
        question.answer = question.answer.filter((ans) => ans._id != answerId)
        question.noOfAnswers = question.answer.length
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json(question)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getMyAnswers = async (req, res) => {
    const { id: _id } = req.params;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const myAnswers = question.answer.filter((ans) => ans.userId === userId)
        res.status(200).json(myAnswers)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const modifyAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, answerBody } = req.body;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const answer = question.answer.find((ans) => ans._id == answerId)
        if (answer.userId !== userId) {
            return res.status(401).send('You can modify only your answers...')
        }
        answer.answerBody = answerBody
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json(question)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const voteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, voteType } = req.body;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const answer = question.answer.find((ans) => ans._id == answerId)
        if (answer.userId === userId) {
            return res.status(401).send('You can not vote your answer...')
        }
        if (answer.upVote.includes(userId) || answer.downVote.includes(userId)) {
            return res.status(401).send('You can only vote once...')
        }
        console.log(voteType)
        if (voteType === 'upVote') {
            if (answer.upVote.includes(userId)) {
                answer.upVote = answer.upVote.filter((id) => id !== userId)
            } else {
                answer.upVote.push(userId)
                answer.downVote = answer.downVote.filter((id) => id !== userId)
            }
        } else if (voteType === 'downVote') {
            if (answer.downVote.includes(userId)) {
                answer.downVote = answer.downVote.filter((id) => id !== userId)
            } else {
                answer.downVote.push(userId)
                answer.upVote = answer.upVote.filter((id) => id !== userId)
            }
        } else {
            return res.status(404).send('Invalid vote type...')
        }
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json(question)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getNumberVoteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const answer = question.answer.find((ans) => ans._id == answerId)
        console.log(answer)
        const noOfUpVote = answer.upVote.length
        const noOfDownVote = answer.downVote.length
        res.status(200).json({ noOfUpVote, noOfDownVote })
    } catch (error) {
        res.status(404).json(error)
    }
}