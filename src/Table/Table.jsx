import React from "react";
import "./Table.css";
import { useContext } from "react";
import { userContext } from "../App";
import { useState } from "react";
import { useRef } from "react";
const Table = ({ addUser, modifyUser, deleteUser }) => {
  const userData = useContext(userContext);
  const addressRef = useRef();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    address: { city: "" },
    phone: "",
    website: "",
    company: { name: "" },
  });
  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name == "address") {
      setFormData((prev) => ({ ...prev, address: { city: value } }));
    } else if (name == "company") {
      setFormData((prev) => ({ ...prev, company: { name: value } }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({
      id: "",
      username: "",
      email: "",
      address: { city: "" },
      phone: "",
      website: "",
      company: { name: "" },
    });
  };
  const handleEdit = (user) => {
    setEdit(true);
    const { id, username, email, address, phone, website, company } = user;
    setFormData({
      id: id,
      username: username,
      email: email,
      address: { city: address.city },
      phone: phone,
      website: website,
      company: { name: company.name },
    });
  };
  const handleUpdateUser = () => {
    console.log("payload in edit", formData);
    modifyUser("a", formData);
  };
  const handleDeleteUser = (user) => {
    deleteUser(user.id);
  };
  return (
    <div className="container-fluid pt-5 bg-info">
      <div className="row">
        <div className="d-flex justify-content-center">
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">Id</span>
              <input
                type="text"
                className="form-control"
                onChange={handleFormData}
                name="id"
                value={formData.id}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">UserName</span>
              <input
                type="text"
                className="form-control"
                onChange={handleFormData}
                name="username"
                value={formData.username}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              <input
                type="email"
                className="form-control"
                onChange={handleFormData}
                name="email"
                value={formData.email}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Address</span>
              <input
                type="text"
                className="form-control"
                onChange={handleFormData}
                ref={addressRef}
                name="address"
                value={formData.address.city}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Phone</span>
              <input
                type="text"
                className="form-control"
                onChange={handleFormData}
                name="phone"
                value={formData.phone}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Website</span>
              <input
                type="text"
                className="form-control"
                onChange={handleFormData}
                name="website"
                value={formData.website}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Company</span>
              <input
                type="text"
                className="form-control"
                onChange={handleFormData}
                name="company"
                value={formData.company.name}
              />
            </div>
            {edit ? (
              <button
                type="button"
                className="btn btn-success w-100 mb-3"
                onClick={() => handleUpdateUser()}
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-100 mb-3"
                onClick={(e) => handleAddUser(e)}
              >
                Submit
              </button>
            )}
          </form>
        </div>
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Website</th>
                <th scope="col">Company</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td scope="row">{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
