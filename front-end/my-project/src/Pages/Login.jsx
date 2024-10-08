import React, { useContext, useState } from "react";
import Einstein_1 from "../images/Einstein_1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User_Context } from "../Contexts/UserContext";
const Login = () => {
  const { getUserData,setUser } = useContext(User_Context);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  console.log(error);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        getUserData();
        navigate("/", { replace: true });
        console.log(response);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex mt-[85px]">
      <div className="lg:w-1/2">
        <img src={Einstein_1} alt="" />
      </div>
      <form action="" className="lg:w-1/2 py-10 px-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold my-6 text-primary col-span-2">
          تسجيل الدخول
        </h1>

        <div className="relative my-6">
          <input
            id="email"
            name="email"
            value={formData.email}
            className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
            onChange={handleChange}
            type="email"
            required
          />
          <label
            className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${formData.firstName ? "-top-4 text-sm text-primary" : ""}`}
            htmlFor="email"
          >
            البريد الالكترونى
          </label>
        </div>
        <div className="relative my-12">
          <input
            id="password"
            name="password"
            value={formData.password}
            className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
            onChange={handleChange}
            type="password"
            required
          />
          <label
            className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${formData.password ? "-top-4 text-sm text-primary" : ""}`}
            htmlFor="password"
          >
            كلمةالسر
          </label>
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <button
          className="px-6 py-3 bg-primary hover:scale-125 duration-300"
          type="submit"
        >
          {" "}
          تسجيل الدخول
        </button>
        <div className=" mt-4">
          لا يوجد لديك حساب ؟{" "}
          <Link to="/register" className="underline font-semibold text-red-500">
            انشئ حساب
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
