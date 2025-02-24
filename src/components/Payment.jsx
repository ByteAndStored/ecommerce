import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { paymentOnline } from "../Apis/payment";
import * as motion from "motion/react-client"



export default function Payment({cartId}) {

  let { mutate, data } = useMutation({mutationFn:paymentOnline});

  function handlePayment(shippingAddress) {
      mutate({ cartId, shippingAddress });
  }
  
  if (data?.data?.status==='success') {
    window.location.href=data?.data?.session?.url
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit: handlePayment,
  });

  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            >
      <h2 className="my-4 text-2xl font-bold">Payment</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          value={formik?.values?.details}
          onChange={formik.handleChange}
          id="details"
        />
        <br />
        <input
          type="text"
          value={formik?.values?.city}
          onChange={formik.handleChange}
          id="city"
        />
        <br />
        <input
          type="text"
          value={formik?.values?.phone}
          onChange={formik.handleChange}
          id="phone"
        />
        <br />
        <button type="submit" className=" bg-green-color p-4 rounded-lg my-5">Submit</button>
      </form>
    </motion.div>
  );
}
