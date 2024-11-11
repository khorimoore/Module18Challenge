import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User';
import { signToken } from '../services/auth';
import Book from '../models/Book';

export const resolvers = {
  Query: {
    // Fetch the logged-in user's information
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        const userData = await User.findById(context.user._id).populate('savedBooks');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    // Fetch all books
    getBooks: async () => {
      const books = await Book.find();
      return books;
    }
  },

  Mutation: {
    // Register a new user and return a token
    createUser: async (_parent: any, args: any) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { ...user, token };
    },
    // Login an existing user
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { ...user, token };
    },
    // Save a book to the user's savedBooks list
    saveBook: async (_parent: any, { bookData }: { bookData: any }, context: any) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    },
    // Remove a book from the user's savedBooks list
    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};