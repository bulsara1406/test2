import { useState, useEffect } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    
    phone: "",
    
    
    disese:"",

    gender:"",
    city:"",
    date:""
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, ...form } : user
      );
      setUsers(updatedUsers);
      setEditId(null);
    } else {
      const newUser = {
        id: Date.now(),
        ...form
      };
      setUsers([...users, newUser]);
    }

    setForm({
      name: "",
      email: "",
    
      phone: "",
      disese: "",
      
      gender:"",
      city:"",
      date:""
    });
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      
      <div className="header">
       patient Registartion
      </div>

      <p className="sub-header">Manage Patient</p>

      <div className="container">
        <h2>{editId ? "Edit Patient" : "Register Patient"}</h2>

        <form onSubmit={handleSubmit} className="form form-grid">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="disese"
            placeholder="Enter Disese"
            value={form.disese}
            onChange={handleChange}
          />

          
           <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              /> Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              /> Female
            </label>
          </div>
          <select name="city" onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="valsad">valsad</option>
            <option value="navsari">navsari</option>
            <option value="vapi">vapi</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            />

          <button type="submit" className="full-width">
            {editId ? "Update patient" : "Add patient"}
          </button>
        </form>

        <h3>Member Records</h3>
        <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>disese</th>

              <th>Gender</th>
              <th>City</th>
              <th>date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.disese}</td>
                  <td>{user.gender}</td>
                    <td>{user.city}</td>
                    <td>{user.date}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default Register;