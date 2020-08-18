const { User } = require('../models');
const { AuthenincationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            const user = await User.findById(context.user._id)
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const toekin = signToken(user)
            return { toekin, user }
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