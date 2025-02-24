import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function ForgotPass() {
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Email is not valid"),
  });

  let [message, setMessage] = useState("");
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(false);

  async function handleForgotPassword(values) {
    setLoading(true);
    setMessage("");
    setErrMsg("");

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log(data);
      if (data.statusMsg === "success") {
        setMessage("A password reset link has been sent to your email.");
        setTimeout(() => navigate('/verify-code'), 2000); // Redirect to verify-code after 3 seconds
      }
    } catch (error) {
      setErrMsg("Email is not registered.");
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-9 text-center">
        Please enter your email
      </h2>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
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
            Email address
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
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
