import React, { useState } from "react";
import { FaUser, FaBook, FaClipboardList } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [currentPath, setCuttentPath] = useState("");
  console.log(currentPath);
  return (
    <div className={`left-0 bg-gray-800 p-4 border-2 border-gray-700`}>
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <IoMdArrowRoundBack className="text-xl text-gray-300 " />
        </div>
      )}
      <ul className="mt-6 text-gray-300">
        <li className="rounded-md overflow-hidden">
          <Link
            to="/admin-dashboard/users"
            onClick={() => {
              setCuttentPath("users");
            }}
            className={`${currentPath === "users" ? "bg-green-600" : ""} 
            hover:bg-gray-700 flex items-center gap-2 py-4 px-6`}
          >
            {isSidebarOpen && <div className="w-24">المستخدمين</div>}
            <FaUser />
          </Link>
        </li>

      
        <li className="rounded-md overflow-hidden">
          <Link
            to="/admin-dashboard/createUser"
            onClick={() => {
              setCuttentPath("createUser");
            }}
            className={`${currentPath === "createUser" ? "bg-green-600" : ""} 
            hover:bg-gray-700 flex items-center gap-2 py-4 px-6`}
          >
            {isSidebarOpen && <div className="w-24">مستخدم جديد</div>}

            <HiUserAdd className="text-xl" />
          </Link>
        </li>
        <li className="rounded-md overflow-hidden">
          <Link
            to="/admin-dashboard/addCourse"
            onClick={() => {
              setCuttentPath("addCourse");
            }}
            className={`${currentPath === "addCourse" ? "bg-green-600" : ""} 
            hover:bg-gray-700 flex items-center gap-2 py-4 px-6`}
          >
            {isSidebarOpen && <div className="w-24"> اضافة كورس</div>}
            <FaBookOpen className="text-xl" />
          </Link>
        </li>
        <li className="rounded-md overflow-hidden">
          <Link
            to="/admin-dashboard/editCourse"
            onClick={() => {
              setCuttentPath("editCourse");
            }}
            className={`${currentPath === "editCourse" ? "bg-green-600" : ""} 
            hover:bg-gray-700 flex items-center gap-2 py-4 px-6`}
          >
            {isSidebarOpen && <div className="w-24"> تعديل كورس</div>}
            <MdEdit className="text-xl" />

          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
