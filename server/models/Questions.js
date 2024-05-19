import mongoose from "mongoose";

const QuestinSchema = mongoose.Schema({
    questionTitle: { type: String, required: "Question must have a title" },
    questionBody: { type: String, required: "Question must have a body" },
    noOfAnswers: { type: Number, default: 0 },
    upVote: { type: [String], default: [] },
    downVote: { type: [String], default: [] },
    userPosted: { type: String, required: "Question must have an author" },
    userId: { type: String },
    askedOn: { type: Date, default: Date.now },
    answer: [{
        answerBody: String,
        userAnswered: String,
        upVote: { type: [String], default: [] },
        downVote: { type: [String], default: [] },
        userId: String,
        answeredOn: { type: Date, default: Date.now }
    }]
})

export default mongoose.model("Question", QuestinSchema)