import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCourseMain from './components/CreateCourse/CreateCourseMain';
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Courses from "./components/Courses/Courses";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import GoogleDrive from "./components/GoogleDrive/GoogleDrive";
import { UserProvider } from "./context/UserContext";
import Profile from "./components/Profile/Profile"
import EditProfile from "./components/Profile/EditProfile";
import CoursePage from "./components/CourseDetails/CoursePage";
import EnrollCourse from "./components/EnrollCourse/EnrollCourse";
import CourseReviews from "./components/CourseDetails/CourseReviews"
import Razorpay from "./components/PaymentGateway/Razorpay";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/driveUpload",
        element: <GoogleDrive />,
      },
      {
        path: "/course/:courseId",
        element: <CoursePage/>,
      },
      {
        path:"/add-new-course",
        element:<CreateCourseMain/>,
      },

      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/edit-profile',
        element:<EditProfile/>
      },
      {
        path:"/enroll/:courseId",
        element:<EnrollCourse/>,
      },
      {
        path: "/course/:courseId/review",
        element:<CourseReviews/>,
      },
      {
        path:"/p/courses/:courseId",
        element:<CourseDetails/>,
      },
      {
        path:"/payment",
        element:<Razorpay/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </UserProvider>

);
