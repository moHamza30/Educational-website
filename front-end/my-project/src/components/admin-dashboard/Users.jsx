import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User_Context } from "../../Contexts/UserContext";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate()
  const { allUsers, setAllUsers, setuserToEdit } = useContext(User_Context);
  const roles = ["Admin", "user"];
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    axios
      .get("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const changeRole = (userId, newRole)=>{
    axios
      .put(`http://localhost:8000/users/${userId}`,{role:newRole},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="p-6 bg-gray-800 text-gray-200 h-full " dir="ltr">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-auto">
          <thead>
            <tr className="bg-gray-700 ">
              <th className="py-2 px-4 text-left">id</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">phone</th>
              <th className="py-2 px-4 text-left">garde</th>
              <th className="py-2 px-4 text-left">city</th>
              <th className="py-2 px-4 text-left flex items-center">role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data - replace this with real data */}
            {allUsers?.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-700">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">{user.grade}</td>
                <td className="py-2 px-4">{user.city}</td>
        
                <td className="py-2 px-4 flex items-center">
                  <div className="relative">
                    <select
                      className="bg-gray-700 text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md py-1 px-2 pr-8"
                      name="role"
                      id="role"
                      onChange={(e) => changeRole(user._id, e.target.value)} // Call changeRole on change

                    >
                      <option value="admin">{user.role}</option>
                      {roles.map(
                        (role, index) =>
                          role !== user.role && (
                            <option  key={index} value={role}>
                              {role}
                            </option>
                          )
                      )}
                    </select>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none">
                      ▼
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <button
                    className=" text-green-500 hover:underline"
                    onClick={() => {
                      setuserToEdit(user);
                      localStorage.setItem("userToEdit", JSON.stringify(user)); // Save to sessionStorage
                    }}
                  >
                    {" "}
                    <Link to={`/admin-dashboard/Edit-user/${user._id}`}>Edit</Link>
                  </button>
                  <button
                    onClick={() => deleteUser(user?._id)}
                    className=" text-red-500 hover:underline ml-2 "
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
  );
};

export default Users;
