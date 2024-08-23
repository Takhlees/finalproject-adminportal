import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageEmployees.css";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    cnic: "",
    contact: "",
    email: "",
    salary: "",
  });
  const [formVisible, setFormVisible] = useState(false); // State to control form visibility

  // Fetch employees from API
  useEffect(() => {
    axios
      .get("https://glimmer-petal-ceder.glitch.me/api/employees/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Select an employee to view or edit
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setFormVisible(true); // Show the form when an employee is selected for editing
  };

  // Handle employee update
  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://glimmer-petal-ceder.glitch.me/api/employees/${selectedEmployee._id}`,
        formData
      )
      .then((response) => {
        setEmployees(
          employees.map((emp) =>
            emp._id === selectedEmployee._id ? response.data : emp
          )
        );
        setSelectedEmployee(null); // Clear selection after update
        setFormVisible(false); // Hide the form after updating
        setFormData({
          name: "",
          image: "",
          cnic: "",
          contact: "",
          email: "",
          salary: "",
        }); // Reset form data
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  // Handle employee deletion
  const handleDeleteEmployee = (id) => {
    axios
      .delete(`https://glimmer-petal-ceder.glitch.me/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter((emp) => emp._id !== id));
        setSelectedEmployee(null); // Clear selection after deletion
        setFormVisible(false); // Hide the form after deletion
        setFormData({
          name: "",
          image: "",
          cnic: "",
          contact: "",
          email: "",
          salary: "",
        }); // Reset form data
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Handle adding a new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    axios
      .post("https://glimmer-petal-ceder.glitch.me/api/employees/", formData)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setFormVisible(false); // Hide the form after adding a new employee
        setFormData({
          name: "",
          image: "",
          cnic: "",
          contact: "",
          email: "",
          salary: "",
        }); // Reset form data
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  // Prepare the form for adding a new employee
  const handleNewEmployee = () => {
    setSelectedEmployee(null);
    setFormData({
      name: "",
      image: "",
      cnic: "",
      contact: "",
      email: "",
      salary: "",
    }); // Reset form data for new employee
    setFormVisible(true); // Show the form when "Add New Employee" is clicked
  };

  // Handle closing the form
  const handleCloseForm = () => {
    setFormVisible(false); // Hide the form
    setSelectedEmployee(null); // Clear selected employee
    setFormData({
      name: "",
      image: "",
      cnic: "",
      contact: "",
      email: "",
      salary: "",
    }); // Reset form data
  };

  return (
    <div className="manage-employees">
      <h1>Manage Employees</h1>

      <button className="add-new" onClick={handleNewEmployee}>
        Add New Employee
      </button>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>CNIC</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="employee-image"
                  />
                </td>
                <td>{employee.cnic}</td>
                <td>{employee.contact}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>
                  <button onClick={() => handleSelectEmployee(employee)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteEmployee(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formVisible && (
        <div className="employee-form">
          <button className="close-button" onClick={handleCloseForm}>
            &times;
          </button>
          <h2>
            {selectedEmployee ? "Edit Employee Details" : "Add New Employee"}
          </h2>
          <form
            onSubmit={
              selectedEmployee ? handleUpdateEmployee : handleAddEmployee
            }>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              CNIC:
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Salary:
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">
              {selectedEmployee ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
