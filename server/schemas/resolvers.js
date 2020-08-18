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

            if (!user) {
                throw new AuthenincationError('incorrect credentials');
            }

            const correctPw = await User
        }
    }
}