import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const emptyForm = {
  name: '',
  email: '',
  fatherName: '',
  phoneNumber: '',
};

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/student');
      setStudents(response.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        const response = await axios.put(
          `http://localhost:3000/api/student/${editingId}`,
          formData
        );
        setSuccess(response.data.message || 'Student updated successfully');
      } else {
        const response = await axios.post('http://localhost:3000/api/student', formData);
        setSuccess(response.data.message || 'Student added successfully');
      }

      resetForm();
      await fetchStudents();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        (editingId ? 'Failed to update student' : 'Failed to add student');
      setError(message);
      console.log(err);
    }
  };

  const handleEdit = (student) => {
    setError('');
    setSuccess('');
    setEditingId(student._id);
    setFormData({
      name: student.name || '',
      email: student.email || '',
      fatherName: student.fatherName || student.parentname || '',
      phoneNumber: student.phoneNumber || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');

    try {
      const response = await axios.delete(`http://localhost:3000/api/student/${id}`);
      setSuccess(response.data.message || 'Student deleted successfully');

      if (editingId === id) {
        resetForm();
      }

      await fetchStudents();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to delete student';
      setError(message);
      console.log(err);
    }
  };

  return (
    <div>
      <h1>ABCD School</h1>
      <h3>Student Management System</h3>
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='input'
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className='input'
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className='input'
          name="fatherName"
          type="text"
          placeholder="Father's name"
          value={formData.fatherName}
          onChange={handleChange}
          required
        />
        <input
          className='input'
          name="phoneNumber"
          type="tel"
          placeholder="Mobile number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button className='button' type="submit">
          {editingId ? 'Update Student' : 'Submit'}
        </button>
        {editingId && (
          <button className='button' type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <h3>Students List</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Father's Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.fatherName || student.parentname || '-'}</td>
              <td>{student.phoneNumber}</td>
              <td>
                <button className='button' type="button" onClick={() => handleEdit(student)}>
                  Edit
                </button>
                <button className='button' type="button" onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
