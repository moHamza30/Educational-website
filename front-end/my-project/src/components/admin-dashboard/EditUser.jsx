import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User_Context } from "../../Contexts/UserContext";
import axios from "axios";

const EditUser = () => {
  const navigate = useNavigate();
  const { userToEdit } = useContext(User_Context);
  console.log(userToEdit);
  const [userData, setUserData] = useState({
    firstName: userToEdit?.firstName || "",
    lastName: userToEdit?.lastName || "",
    email: userToEdit?.email || "",
    role: userToEdit?.role || "",
    phone: userToEdit?.phone || "",
    grade: userToEdit?.grade || "",
    city: userToEdit?.city || "",
  });
console.log(userData)
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    const id = userToEdit?._id;
    axios
      .put(`http://localhost:8000/users/${id}`,userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserData({
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          phone: "",
          grade: "",
          city: "",
        });
      })
      .catch((err) => console.log(err));

    // onSave(userData); // Call the onSave function with updated user data
  };

  return (
    <div className="bg-gray-800 p-6 h-full" dir="ltr">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200 font-semibold">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-200 rounded"
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin-dashboard/users")}
            className="mr-2 text-red-500"
          >
            Cancel
          </button>
          <button type="submit" className="text-green-500">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
