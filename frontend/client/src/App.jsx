import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.target);
      const studentData = Object.fromEntries(formData.entries());

      const response = await axios.post('http://localhost:3000/api/student', studentData);
      setSuccess(response.data.message || 'Student added successfully');
      e.target.reset();
      await fetchStudents();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to add student';
      setError(message);
      console.log(err);
    }
  };

  return (
    <div>
      <h1>ABCD School</h1>
      <h3>Student Management System</h3>
      <form className='form' onSubmit={handleSubmit}>
        <input className='input' name="name" type="text" placeholder="Name" required />
        <input className='input' name="email" type="email" placeholder="Email" required />
        <input className='input' name="fatherName" type="text" placeholder="Father's name" required />
        <input className='input' name="phoneNumber" type="tel" placeholder="Mobile number" required />
        <button className='button' type="submit">Submit</button>
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
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.fatherName || student.parentname || '-'}</td>
              <td>{student.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
