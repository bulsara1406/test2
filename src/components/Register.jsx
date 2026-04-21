import { useState, useEffect } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    membershipId: "",
    book: "",
    issueDate: ""
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
      password: "",
      phone: "",
      membershipId: "",
      book: "",
      issueDate: ""
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
      {/* HEADER */}
      <div className="header">
        📚 Library Management System
      </div>

      <p className="sub-header">Manage Members & Book Issues</p>

      <div className="container">
        <h2>{editId ? "Edit Member" : "Register Member"}</h2>

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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="membershipId"
            placeholder="Membership ID"
            value={form.membershipId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="book"
            placeholder="Book Issued"
            value={form.book}
            onChange={handleChange}
          />

          <input
            type="date"
            name="issueDate"
            value={form.issueDate}
            onChange={handleChange}
          />

          <button type="submit" className="full-width">
            {editId ? "Update Member" : "Add Member"}
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
              <th>Membership</th>
              <th>Book</th>
              <th>Date</th>
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
                  <td>{user.membershipId}</td>
                  <td>{user.book}</td>
                  <td>{user.issueDate}</td>
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