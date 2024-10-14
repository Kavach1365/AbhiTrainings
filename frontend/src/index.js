import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCourseMain from "./components/CreateCourse/CreateCourseMain";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Courses from "./components/Courses/Courses";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import GoogleDrive from "./components/GoogleDrive/GoogleDrive";
import { UserProvider } from "./context/UserContext";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import CoursePage from "./components/CourseDetails/CoursePage";
import EnrollCourse from "./components/EnrollCourse/EnrollCourse";
import CourseReviews from "./components/CourseDetails/CourseReviews";
import {
  ProtectedRoute,
  SuperAdminRoute,
  CourseAuthProtectedRoute,
} from "./protectedRoutes/protectedRoutes";
import NotAuthorized from "./components/shared/NotAuthorized";
import NotFound from "./components/shared/NotFound";
import Razorpay from "./components/PaymentGateway/Razorpay";
import EmailVerify from "./components/EmailVerify/EmailVerify";

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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/add-new-course",
        element: (
          <SuperAdminRoute>
            <CreateCourseMain />
          </SuperAdminRoute>
        ),
      },
      {
        path: "/course/:courseId/overview",
        element: <CoursePage />,
      },
      // {
      //   path: "/courses/:courseId",
      //   element: <CourseOverview />,
      // },
      {
        path:"/p/courses/:courseId",
        element:<CourseDetails/>,
      },
      {
        path: "/payment/:courseId",
        element: <Razorpay />,
      },
      {
        path:'/course-details',
        element:<CourseDetails/>
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
