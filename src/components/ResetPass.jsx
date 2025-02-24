import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from "../Context/UserToken";

export default function ResetPass() {
  let { setLogin } = useContext(userToken);
  let navigate = useNavigate();

  // Validation Schema
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  let [message, setMessage] = useState("");
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(false);

  // Handle Form Submission
  async function handleResetPassword(values) {
    setLoading(true);
    setMessage("");
    setErrMsg("");

    try {
      // Retrieve token (if available)
      const token = localStorage.getItem("userToken");

      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        { newPassword: values.newPassword, email: values.email }, // Fixed payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // token usage
          },
        }
      );

      if (data.token) {
        setMessage("Password reset successfully! Redirecting...");
        setLogin(data.token);

        // Store the token in local storage
        localStorage.setItem("userToken", data.token);

        // Redirect to home page after 2 seconds
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.log(error);
      setErrMsg("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Formik Configuration
  let formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-9 text-center">
        Reset Your Password
      </h2>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {/* Email Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        {/* New Password Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
        </div>

        {/* Success & Error Messages */}
        {message && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">{message}</span>
          </div>
        )}

        {errMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{errMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-teal-400"></i>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
