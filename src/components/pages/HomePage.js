import React, { Fragment } from "react";
import Navbar from "../utils/Navbar";
import Categories from "../utils/Categories";
import FilterMS from "../utils/FilterMS";
import Footer from "../utils/Footer";
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
