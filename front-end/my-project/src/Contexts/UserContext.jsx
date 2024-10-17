import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const User_Context = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedState = localStorage.getItem('user');
      return savedState ? JSON.parse(savedState) : null;
    } catch (error) {
      console.error("Failed to parse 'user' from localStorage:", error);
      return null;
    }
  });
  const [allUsers, setAllUsers] = useState(null);
  const [userToDelete, setuserToDelete] = useState(null);
  const [userToEdit, setuserToEdit] = useState(() => {
    const savedUserToEdit = localStorage.getItem("userToEdit");
    return savedUserToEdit ? JSON.parse(savedUserToEdit) : null; // Safely parse or set null
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const getUserData = () => {
    axios
      .get(`http://localhost:8000/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <User_Context.Provider
      value={{
        user,
        setUser,
        allUsers,
        setAllUsers,
        userToEdit,
        setuserToEdit,
        userToDelete,
        setuserToDelete,
        getUserData,
      }}
    >
      {children}
    </User_Context.Provider>
  );
};

export default UserContext;
