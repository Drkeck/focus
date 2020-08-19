const { User } = require('../models');
const { AuthenincationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        Me: async (parent, args, context) => {
            const userData = await User.findById(context.user._id)
            return userData
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
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });
            const correctPw = await User.isPasswordCorrect(password);

            if (!correctPw || !user) {
                throw new AuthenincationError('incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
}

module.exports = resolvers;