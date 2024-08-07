import React, { useEffect, useState } from "react";
import "./CourseOverview.css";
import { useLocation, Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";
import CourseCard from "../Courses/CourseCard";
import styles from "../Courses/Courses.module.css";
import { FaStar } from "react-icons/fa6";
import getCourseById from "../../utils/getCourseById";
import getAllCourses from "../../utils/getAllCourses";

const CourseOverview = () => {
  const [course, setCourse] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [activeSection, setActiveSection] = useState("overview"); // New state for active section
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await getCourseById(id);
      if (courseData) {
        setCourse(courseData);
      }
      const courses = await getAllCourses();
      if (courses) {
        setCoursesList(courses);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const {
    title,
    category,
    level,
    description,
    thumbnailImage,
    coverImage,
    duration,
    pricingInfo,
    publishedDate,
    rating,
    instructorImage,
    instructorName,
    discountInPercentage = 0,
  } = course;
  const price = pricingInfo.price;

  const renderSection = () => {
    switch (activeSection) {
      case "feedback":
        return (
          <div className="course-feedback">
            <h1>{title}</h1>
            <div className="course-feedback-upper">
              <div className="feedback-box">
                <p>4 out of 5 stars</p>
                <p className="stars">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </p>
                <p>Top Rating</p>
              </div>
              <div className="feedback-stars">
                <p>5 stars</p>
                <p>4 stars</p>
                <p>3 stars</p>
                <p>2 stars</p>
                <p>1 star</p>
              </div>
              <div className="feedback-progress">
                <p>
                  <progress id="file" value="92" max="100"></progress>
                </p>
                <p>
                  <progress id="file" value="80" max="100"></progress>
                </p>
                <p>
                  <progress id="file" value="72" max="100"></progress>
                </p>
                <p>
                  <progress id="file" value="42" max="100"></progress>
                </p>
                <p>
                  <progress id="file" value="32" max="100"></progress>
                </p>
              </div>
            </div>
            <div className="course-feedback-lower">
              <div className="userprofile">
                <div>
                  <img
                    src="https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg"
                    alt="User"
                  />
                </div>
                <div className="user-name-stars">
                  <span>Anil</span>
                  <p className="stars">
                    <FaStar /> <FaStar /> <FaStar />
                  </p>
                </div>
              </div>
              <div>
                <p>It is very exciting to share the journey with Abhi Trainings</p>
                <hr />
              </div>
            </div>
          </div>
        );
      case "overview":
        return <div>Overview content goes here...</div>; // Placeholder for overview content
      case "curriculum":
        return <div>Curriculum content goes here...</div>; // Placeholder for curriculum content
      case "instructors":
        return <div>Instructors content goes here...</div>; // Placeholder for instructors content
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="courseDetails">
      <div className="courseDetails-banner-image">
        <img
          src="https://as2.ftcdn.net/v2/jpg/02/45/08/01/1000_F_245080107_golTKP2zTGtOtpcUgcXRK84Pu7cWAiGh.jpg"
          alt={title}
        />
      </div>
      <div className="course-overview-buttons">
        <button onClick={() => setActiveSection("overview")}>Overview</button>
        <button onClick={() => setActiveSection("curriculum")}>Curriculum</button>
        <button onClick={() => setActiveSection("instructors")}>Instructors</button>
        <button onClick={() => setActiveSection("feedback")}>
          {activeSection === "feedback" ? "Feedback" : "Feedback"}
        </button>
      </div>
      <div className="course-overview">
        {renderSection()}
        {activeSection === "feedback" && (
          <div className="course-details">
            <div className="course-discount">
              <p>&#8377;{price - (discountInPercentage * price) / 100}</p>
              {discountInPercentage !== 0 && (
                <p>
                  <span className="discount-offer">&#8377;{price}</span>
                  {discountInPercentage}% Off
                </p>
              )}
              <Link to={`/payment?price=${price}`}><button>Buy Now</button></Link>
              
            </div>
            <hr />
            <div className="course-includes-header">
              <h4>This Course Includes</h4>
              <div className="course-includes">
                <FaInstagram className="icons" size={35} />
                <span>Money Back Guarantee</span>
              </div>
              <div className="course-includes">
                <FaWhatsapp className="icons" size={35} />
                <span>Access on all devices</span>
              </div>
              <div className="course-includes">
                <FaTwitter className="icons" size={35} />
                <span>Certification of Completion</span>
              </div>
              <div className="course-includes">
                <FaInstagram className="icons" size={35} />
                <span>32 Modules</span>
              </div>
            </div>
            <hr />
            <div className="training-people-header">
              <h4>Training 5 or more people</h4>
              <p>
                Class launched over a year ago and it is still running successfully
                Pushpa - The Rise
              </p>
            </div>
            <hr />
            <div className="share-course">
              <h4>Share this course</h4>
              <FaWhatsapp className="share-icons" size={50} />
              <FaInstagram className="share-icons" size={50} />
              <FaTwitter className="share-icons" size={50} />
            </div>
          </div>
        )}
      </div>
      <div className="marketing-articles">
        <p className="marketing-heading">Marketing Articles</p>
        <ul className={styles.coursesContainer}>
          {coursesList &&
            coursesList.map((eachCourse) => (
              // <Link
              //   className={styles.courseCardLinkContainer}
              //   key={eachCourse._id}
              //   to={`/course/${eachCourse._id}`}
              // >
                <CourseCard courseDetails={eachCourse} />
              // </Link>
            ))}
        </ul>
      </div>
      <div className="physical-classroom">
        <div className="physical-classroom-text">
          <p>
            <span className="ellipse"></span>
            Everything you can do in a physical classroom,{" "}
            <span>TOTC</span>
          </p>
          <p>
            TOTC’s school management software helps traditional and online
            schools manage scheduling, attendance, payments, and virtual
            classrooms all in one secure cloud-based system.
          </p>
          <p>Learn more</p>
        </div>
        <div className="physical-classroom-image">
          <img
            src="https://img.freepik.com/free-photo/confident-teacher-explaining-lesson-pupils_74855-9751.jpg"
            alt="Classroom"
          />
        </div>
      </div>
      <div className="education">
        <h3>Top Education Offers and Deals are listed here</h3>
        <div className="top-education">
          <div className="top-education-card">
            <div className="top-education-card-offer-box">50%</div>
            <p>FOR INSTRUCTORS</p>
            <p>
              Abhi Trainings software management helps traditional and online
              schools manage scheduling
            </p>
          </div>
          <div className="top-education-card">
            <div className="top-education-card-offer-box">50%</div>
            <p>FOR INSTRUCTORS</p>
            <p>
              Abhi Trainings software management helps traditional and online
              schools manage scheduling
            </p>
          </div>
          <div className="top-education-card">
            <div className="top-education-card-offer-box">50%</div>
            <p>FOR INSTRUCTORS</p>
            <p>
              Abhi Trainings software management helps traditional and online
              schools manage scheduling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
