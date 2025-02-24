import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { counterContext } from "../Context/CounterContext";
import CategoriesSlider from "./CategoriesSlider";
import FeaturedProduct from "./FeaturedProduct";
import Header from "./Header";

export default function Home() {
  let { counter, increase } = useContext(counterContext);


  let dispatch = useDispatch()

  return (
    <div className=" container mt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home com</title>
      </Helmet>

      <Header></Header>
      <CategoriesSlider></CategoriesSlider>
      <FeaturedProduct></FeaturedProduct>
    </div>
  );
}
