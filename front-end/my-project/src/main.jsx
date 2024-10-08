import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContext from "./Contexts/UserContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import CoursesContext from "./Contexts/CoursesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext>
      <CoursesContext>
      <Router>
        <App />
      </Router>
      </CoursesContext>
    </UserContext>
  </StrictMode>
);
