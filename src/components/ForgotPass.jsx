import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "../libs/axios"; // 🔄 Axios instance'ımızı kullandık

export default function ForgotPass() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Email is not valid"),
  });

  // ✅ Formik ile form yönetimi
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  // ✅ API çağrısı (libs/axios üzerinden)
  async function handleForgotPassword(values) {
    setLoading(true);
    setMessage("");
    setErrMsg("");

    try {
      const { data } = await axios.post("/auth/forgotPasswords", values);

      if (data.statusMsg === "success") {
        setMessage("A password reset link has been sent to your email.");
        setTimeout(() => navigate("/verify-code"), 2000);
      }
    } catch (error) {
      setErrMsg("Email is not registered.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-9 text-center">
        Please enter your email
      </h2>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {message && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
            <span className="font-medium">{message}</span>
          </div>
        )}

        {errMsg && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            <span className="font-medium">{errMsg}</span>
          </div>
        )}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-white"></i>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
