import React, { Fragment } from "react";
import Navbar from "../navbar/Navbar";
import Categories from "../categories/Categories";
import FilterMS from "../filterms/FilterMS";
import Footer from "../footer/Footer";
const HomePage = () => {
  return (
    <Fragment>
      <Navbar />
      <FilterMS />
      <br />
      <Categories />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
