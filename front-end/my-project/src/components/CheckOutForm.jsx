// src/components/CheckoutForm.jsx
import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Courses_Context } from "../Contexts/CoursesContext";
import { User_Context } from "../Contexts/UserContext";

const CheckoutForm = () => {
  const location = useLocation();
  const { clientSecret, courseId } = location.state;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useContext(User_Context);
  const { courses } = useContext(Courses_Context);
  const course = courses.find((course) => {
    return course._id === courseId;
  });
  console.log(course);
  console.log(courseId);
  console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    try {
      const { error: paymentError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (paymentError) {
        setError(paymentError.message);
        setSuccess("");
      } else {
        const response = await axios.put(
          "http://localhost:8000/users/bookCourse",
          { courseId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          setUser(response.data);
          setSuccess("Payment successful!");
          setError("");
        } else {
          setError("Could not update course status.");
        }
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="mt-[100px] h-[90vh]">
        <h1 className="text-xl font-bold">كورس {course.title}</h1>
        <p className="font-semibold">{course.description}</p>
      <form onSubmit={handleSubmit} className="mt-5">
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
