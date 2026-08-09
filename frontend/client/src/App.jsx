import React from 'react'
import './App.css';
function App() {

  //const [data, setData] = useState(null);


  //const fetchData = async () => {}
  return (
    <div>
      <h1>ABCD School</h1>
      <h3>Student Management System</h3>
      <form className='form'>
        <input className='input' type="text" placeholder="Name" />
        <input className='input' type="email" placeholder="Email" />
        <input className='input' type="text" placeholder="Father's name" />
        <input className='input' type="number" placeholder="Mobile number" />
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
