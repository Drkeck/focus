const { User } = require('../models');
const { AuthenincationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        Me: async (parent, args, context) => {
            const userData = await User.findById(context.user._id).populate('friends');
            return userData
        },
        users: async (parent, args) => {
            return User.find().populate('friends')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)
            return { token, user }
        },
        login: async (parent, { username, password}) => {
            const user = await User.findOne({ username });
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw || !user) {
                throw new AuthenincationError('incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addFriend: async (parent, { userId }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: userId } },
                    { new: true }
                ).populate('friends')
                return updateUser;
            }

            throw new AuthenincationError('You need to be logged in');
        },
        removeFriend: async (parent, {userId}, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { friends: userId } },
                    { new: true }
                ).populate('friends')
                return updateUser;
            }

            throw new AuthenincationError('You need to be logged in');
        }
    }
}

module.exports = resolvers;