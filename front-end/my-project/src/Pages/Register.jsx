import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  console.log(errors);
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    grade: "الثالث الثانوى",
    city: "السويس",
    email: "",
    password: "",
    repassword: "",
  });
  console.log(userData.city);
  console.log(userData.grade);
  const handleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        userData
      );
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
  const cities = [
    "السويس",
    "القاهرة",
    "الجيزه",
    "القلبوبيه",
    "بنى سويف",
    "الاسماعيلية",
    "اسوان",
    "الاسكندرية",
    "اسيوط",
    "الاقصر",
  ];
  const grade = ["الاول الثانوى", "الثانى الثانوى", "الثالث الثانوى"];
  return (
    <div className="container mt-[85px]">
      <div className="flex flex-col lg:flex-row ">
        <div className="hidden lg:block lg:w-1/2 max-w-[400px]">
          <img src="/teacher.jpg" alt="" />
        </div>
        <form
          action=""
          className="lg:w-1/2 py-10 lg:grid gap-4 grid-cols-2 p-2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold my-6 text-primary col-span-2">
            أنشء حسابك الآن :
          </h1>
          <div className="relative my-6">
            <input
              id="firstName"
              name="firstName"
              value={userData.firstName}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
              onChange={handleChange}
              type="text"
              required
            />
            <label
              className={`absolute right-2 
                top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.firstName ? "-top-4 text-sm text-primary" : ""}
               `}
              htmlFor="firstName"
            >
              الاسم الاول
            </label>
            {errors.firstName && <p className="text-red-500">{`*${errors.firstName}`}</p>}

          </div>
          <div className="relative my-6">
            <input
              id="lastName"
              name="lastName"
              value={userData.lastName}
              type="text"
              required
              className="peer w-full  focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
              onChange={handleChange}
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.lastName ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="lastName"
            >
              الاسم الثانى
            </label>
            {errors.lastName && <p className="text-red-500">{`*${errors.lastName}`}</p>}

          </div>
          <div className="relative my-6">
            <input
              type="phone"
              id="phone"
              name="phone"
              value={userData.phone}
              className="peer w-full  focus:outline-none focus:border-b-4 border-primary border-b p-2 mx-2"
              onChange={handleChange}
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
            peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
            ${userData.phone ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="phone"
            >
              {" "}
              رقم الهاتف
            </label>
            {errors.phone && <p className="text-red-500">{`*${errors.phone}`}</p>}
            
          </div>
       

          {/* city dropDown */}
          <div className="col-span-2 my-4">
            <select
              name="city"
              id="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full border border-primary border-b p-2 mx-2"
              required
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500">{`*${errors.city}`}</p>}

          </div>
          {/* grade dropDown */}
          <div className="col-span-2">
            <select
              name="grade"
              id="grade"
              onChange={handleChange} // Add onChange handler
              value={userData.grade}
              className="w-full border border-primary border-b p-2 mx-2"
              required
            >
              {grade.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.grade && <p className="text-red-500">{`*${errors.grade}`}</p>}
            
          </div>

          <div className="relative my-6 col-span-2">
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.email ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="email"
            >
              {" "}
              البريد الالكترونى
            </label>
            {errors.email && <p className="text-red-500">{`*${errors.email}`}</p>}

          </div>
          <div className="relative my-6">
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.password ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="password"
            >
              {" "}
              كلمة السر
            </label>
            {errors.password && <p className="text-red-500">{`*${errors.password}`}</p>}

          </div>
          <div className="relative my-6">
            <input
              type="password"
              id="repassword"
              name="repassword"
              value={userData.repassword}
              onChange={handleChange}
              className="peer w-full focus:outline-none focus:border-b-4 border-primary border-b  p-2 mx-2"
              required
            />
            <label
              className={`absolute right-2 top-2 transition-all duration-300
                peer-focus:text-sm peer-focus:-top-4 peer-focus:text-primary
                ${userData.repassword ? "-top-4 text-sm text-primary" : ""}`}
              htmlFor="repassword"
            >
              تاكيد كلمة السر
            </label>
            {errors.repassword && <p className="text-red-500">{`${errors.repassword} *`}</p>}

          </div>
          <button
            className="px-6 py-3 bg-primary hover:scale-125 duration-300"
            type="submit"
          >
            انشئ الحساب
          </button>
          <div className=" mt-4 col-span-2">
            {" "}
            يوجد لديك حساب بالفعل؟{" "}
            <Link to="/login" className="underline font-semibold text-red-500">
              {" "}
              ادخل إلى حسابك الآن !
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
