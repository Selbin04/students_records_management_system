import Student from "../dbmodels/studentdatamodels.js";

const getstudentlist = async (req, res) => {
    try {
        const studentslist = await Student.find();
        if (!studentslist) {
            return res.status(404).json({ message: "No Students Found" });
        }
        res.status(200).json(studentslist);
    } catch (error) {
        console.log("Error Fetching Students", error);
        return res.status(500).json({ message: "Error Fetching Students", error: error.message });
    }
   
}
const addnewstudent = async (req, res) => {
    try {
        const { name , email , gender, parentname, phoneNumber} = req.body;
        const newstudent = new Student({
            name,
            email,
            gender,
            parentname,
            phoneNumber,
        });
        await newstudent.save();
        res.status(201).json({ message: "Student Added Successfully", newstudent });
    } catch (error) {
        console.log("Error Adding Student", error);
        return res.status(500).json({ message: "Error Adding Student", error: error.message });
    }

}
const editstudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name , email , gender, parentname, phoneNumber} = req.body;
        const updatedstudent = await Student.findByIdAndUpdate(id, {
            name,
            email,
            gender,
            parentname,
            phoneNumber,
        }, { new: true });
        if (!updatedstudent) {
            return res.status(404).json({ message: "Student Not Found" });
        }
        res.status(200).json({ message: "Student Updated Successfully", updatedstudent });
    } catch (error) {
        console.log("Error Editing Student", error);
        return res.status(500).json({ message: "Error Editing Student", error: error.message });
    }
}
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
}

export {getstudentlist, addnewstudent, editstudent, deletestudent}  