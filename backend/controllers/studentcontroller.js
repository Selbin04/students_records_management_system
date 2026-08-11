import Student from "../dbmodels/studentdatamodels.js";

const getstudentlist = async (req, res) => {
    try {
        const studentslist = await Student.find().sort({ createdAt: -1 });
        res.status(200).json(studentslist);
    } catch (error) {
        console.log("Error Fetching Students", error);
        return res.status(500).json({ message: "Error Fetching Students", error: error.message });
    }
};

const addnewstudent = async (req, res) => {
    try {
        const { name, email, fatherName, phoneNumber } = req.body;

        if (!name || !email || !fatherName || !phoneNumber) {
            return res.status(400).json({
                message: "Name, email, father's name, and phone number are required",
            });
        }

        const studentData = {
            name,
            email: email.toLowerCase().trim(),
            fatherName,
            phoneNumber: String(phoneNumber).trim(),
        };

        const existingStudent = await Student.findOne({ email: studentData.email });

        if (existingStudent) {
            existingStudent.name = studentData.name;
            existingStudent.fatherName = studentData.fatherName;
            existingStudent.phoneNumber = studentData.phoneNumber;
            await existingStudent.save();
            return res.status(200).json({
                message: "Student updated successfully (email already existed)",
                newstudent: existingStudent,
            });
        }

        const newstudent = new Student(studentData);
        await newstudent.save();
        res.status(201).json({ message: "Student Added Successfully", newstudent });
    } catch (error) {
        console.log("Error Adding Student", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "A student with this email already exists",
            });
        }

        if (error.name === "ValidationError") {
            const firstError = Object.values(error.errors || {})[0];
            return res.status(400).json({
                message: firstError?.message || "Student validation failed",
                error: error.message,
            });
        }

        return res.status(500).json({ message: "Error Adding Student", error: error.message });
    }
};

const editstudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, fatherName, phoneNumber } = req.body;
        const updatedstudent = await Student.findByIdAndUpdate(
            id,
            {
                name,
                email,
                fatherName,
                phoneNumber: phoneNumber !== undefined ? String(phoneNumber) : undefined,
            },
            { new: true, runValidators: true }
        );
        if (!updatedstudent) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.status(200).json({ message: "Student Updated Successfully", updatedstudent });
    } catch (error) {
        console.log("Error Editing Student", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "A student with this email already exists",
            });
        }

        if (error.name === "ValidationError") {
            const firstError = Object.values(error.errors || {})[0];
            return res.status(400).json({
                message: firstError?.message || "Student validation failed",
                error: error.message,
            });
        }

        return res.status(500).json({ message: "Error Editing Student", error: error.message });
    }
};

const deletestudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedstudent = await Student.findByIdAndDelete(id);
        if (!deletedstudent) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.status(200).json({ message: "Student Deleted Successfully", deletedstudent });
    } catch (error) {
        console.log("Error Deleting Student", error);
        return res.status(500).json({ message: "Error Deleting Student", error: error.message });
    }
};

export { getstudentlist, addnewstudent, editstudent, deletestudent };
