import mongoose from "mongoose";
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUsersDetails = []
        allUsers.forEach(users => {
            allUsersDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn })
        })
        res.status(200).json(allUsersDetails);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { name, about, tags } = req.body;
    try {
        const updatedProfile = await User.findByIdAndUpdate(req.userId, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true })
        res.status(200).json(updatedProfile)
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}