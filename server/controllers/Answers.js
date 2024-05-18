import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable');
    }
    updatedNoOfQuestions(_id, noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        res.status(200).json(updatedQuestion)
    }
    catch (error) {
        res.status(400).json(error)
    }
}

const updatedNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswers } })
    }
    catch (error) {
        console.log(error)
    }
}


export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable...');
    }

    updatedNoOfQuestions(_id, noOfAnswers)

    try {
        await Questions.updateOne(
            { _id },
            { $pull: { 'answer': { _id: answerId } } }
        )

        res.status(200).json({ message: "successfully deleted..." })

    }

    catch (error) {
        res.status(405).json(error)
    }
}

export const voteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable...');
    }

    try {
        const question = await Questions.findById(_id)
        const answer = question.answer.find((ans) => ans._id == answerId)
        const upIndex = answer.upVote.findIndex((id) => id === String(userId))
        const downIndex = answer.downVote.findIndex((id) => id === String(userId))

        if (value === 'upVote') {
            if (downIndex !== -1) {
                answer.downVote = answer.downVote.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                answer.upVote.push(userId)
            }
            else {
                answer.upVote = answer.upVote.filter((id) => id !== String(userId))
            }
        }

        else if (value === 'downVote') {
            if (upIndex !== -1) {
                answer.upVote = answer.upVote.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                answer.downVote.push(userId)
            }
            else {
                answer.downVote = answer.downVote.filter((id) => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json(question)
    }
    catch (error) {
        res.status(404).json(error)
    }
}