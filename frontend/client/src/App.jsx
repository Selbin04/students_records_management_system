import {useState,React } from 'react'
import './App.css';
import axios from 'axios';
function App() {

  const [data, setData] = useState(null);


  //const fetchData = async () => {}

    const handleSubmit = (e) => {
      e.preventDefault();
    
      // Extract form data automatically using input 'name' attributes
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      setData(data);
      console.log(data);
      axios.post('http://localhost:3000/api/student', data)
    }
  return (
    <div>
      <h1>ABCD School</h1>
      <h3>Student Management System</h3>
      <form className='form' onSubmit={handleSubmit}>
        <input className='input' name="name" type="text" placeholder="Name" />
        <input className='input' name="email" type="email" placeholder="Email" />
        <input className='input' name="fatherName" type="text" placeholder="Father's name" />
        <input className='input' name="phoneNumber" type="number" placeholder="Mobile number" />
        <button className='button' type="submit">Submit</button>
      </form>
      <h3>Students List</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default App
