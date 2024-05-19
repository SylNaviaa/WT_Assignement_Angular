import Questions from "../models/Questions.js"
import mongoose from "mongoose"

export const askQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions({
        ...postQuestionData,
        userPosted: req.userId // Assign userId to userPosted field
    });
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully");
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't post a new question");
    }
};

export const getMyQuestions = async (req, res) => {
    try {
        const questionsList = await Questions.find({ userPosted: req.userId });
        res.status(200).json(questionsList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questionsList = await Questions.find();
        res.status(200).json(questionsList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getQuestionsByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const questionsList = await Questions.find({ questionTitle: { $regex: title, $options: 'i' } });
        res.status(200).json(questionsList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        await Questions.findByIdAndDelete(_id);
        res.status(200).json({ message: "successfully deleted..." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getQuestionById = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        const question = await Questions.findById(_id);
        res.status(200).json(question);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}