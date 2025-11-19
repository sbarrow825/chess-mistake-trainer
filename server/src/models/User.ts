import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      default: 'local',
    },
  },
  {
    timestamps: true,
  }
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>('User', userSchema);
