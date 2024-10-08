import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MonthsList from "./Pages/MonthsList";
import CourseDetails from "./components/CourseDetails";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import Users from "./components/admin-dashboard/Users";
import EditUser from "./components/admin-dashboard/EditUser";
import { User_Context } from "./Contexts/UserContext";
import CreateUser from "./components/admin-dashboard/CreateUser";
import AddCourse from "./components/admin-dashboard/addCourse";
import EditCourse from "./components/admin-dashboard/EditCourse";
import Homework from "./components/Homework";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_KEY);
const App = () => {

  const { userToEdit } = useContext(User_Context);
  const location = useLocation();

  return (
    <Elements stripe={stripePromise}>
      {!location.pathname.startsWith("/admin-dashboard") && <Header />}

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/monthsList/:grade" element={<MonthsList />} />
        <Route path="/courseDetails/:courseId" element={<CourseDetails />} />
        <Route path="/course/:courseId/weeks/:weekId/lecs/:lecId/homework" element={<Homework />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<Users />} />
          <Route path="users" element={<Users />} />
          <Route
            path="Edit-user"
            element={<EditUser userToEdit={userToEdit} />}
          />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="addCourse" element={<AddCourse />} />
          <Route path="editCourse" element={<EditCourse />} />
        </Route>
      </Routes>
      <Footer />
    </Elements>
  );
};

export default App;
