import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"], 
      enum: {
        values: ["Male", "Female", "Other", "male", "female", "other"],
        message: "{VALUE} is not a valid gender choice",
      },
      trim: true,
    },
    parentname:{
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
    },
    
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^\+?[0-9]{7,15}$/,
        "Please provide a valid phone number",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;