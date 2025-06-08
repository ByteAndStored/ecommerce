import axios from "../libs/axios"; // 🔁 axios'un yeni configli versiyonu
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from "../Context/UserToken";

export default function Login() {
  const { setLogin } = useContext(userToken);
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{2,10}$/, "Password must start with uppercase and be 3-11 characters."),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    setErrMsg("");

    try {
      const { data } = await axios.post("/auth/signin", values); // 🔁 BASE_URL + endpoint
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setLogin(data.token);
        navigate("/cart");
      }
    } catch (error) {
      setErrMsg("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-3">Login Now:</h2>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        {/* Error message */}
        {errMsg && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            <span className="font-medium">{errMsg}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-teal-400"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
