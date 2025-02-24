import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../assets/images/freshcart-logo.svg";

export default function Component() {
  return (
    <Footer container className=" dark:text-gray-400 mt-5">
      <div className="container">
      <div className="w-full text-center my-10">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        <Link
          to="/"
          className="flex w-[20%] items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="dark:bg-white " alt="" />
        </Link>
        <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li className='dark:text-white' href="#">About</li>
            <li className="dark:text-white" href="#">Privacy Policy</li>
            <li className="dark:text-white" href="#">Licensing</li>
            <li className="dark:text-white" href="#">Contact</li>
          </ul>
          
        </div>
        <Footer.Divider />
        <Footer.Copyright className="dark:text-white" href="#" by="Flowbite™" year={2022} />
      </div>
      </div>

    </Footer>
  );
}
