import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Razorpay.css";
import { useParams } from "react-router-dom";
import getCourseById from "../../utils/getCourseById";

const Razorpay = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      const data = await getCourseById(courseId);
      setCourseData(data);
    };

    fetchCourseData();
  }, [courseId]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = () => {
    if (!courseData) return; // Ensure courseData is loaded

    const data = JSON.stringify({
      amount: courseData.pricingInfo?.price*100,
      currency: "INR",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:1234/orders",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay SDK. Please try again.");
      return;
    }

    const options = {
      key: 'rzp_test_akyGsz2f5xPFbl',
      amount: amount,
      currency: 'INR',
      name: "Abhi Trainings",
      description: "Payment to Abhi Trainings",
      image: "abhiTrainings-logo.png",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "Abhi Trainings",
        email: "abhitrainings888@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios.get(`http://localhost:1234/payment/${paymentId}`)
      .then((response) => {
        setResponseState(response.data);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  if (!courseData) {
    return <p>Loading...</p>; // Show a loading state while fetching course data
  }

  return (
    <div className="razorpay">
      <button onClick={createRazorpayOrder}>Payment of {courseData.pricingInfo?.price-courseData.pricingInfo?.discount} Rs.</button>
      {responseId && <p>Payment ID: {responseId}</p>}
      <h1>Enrollment for {courseData.title}</h1>
      <form onSubmit={paymentFetch}>
        <input type="text" name="paymentId" placeholder="Enter Payment ID" />
        <button type="submit">Fetch Payment</button>
        {responseState.length !== 0 && (
          <ul>
            <li>Amount: {responseState.amount} Rs.</li>
            <li>Currency: {responseState.currency}</li>
            <li>Status: {responseState.status}</li>
            <li>Method: {responseState.method}</li>
          </ul>
        )}
      </form>
    </div>
  );
};

export default Razorpay;
