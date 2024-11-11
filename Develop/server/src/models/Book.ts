import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  bookId: string;
  title: string;
  authors: string[];
  description?: string;
  image?: string;
  link?: string;
}

const bookSchema = new Schema<IBook>({
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

export default model<IBook>('Book', bookSchema);