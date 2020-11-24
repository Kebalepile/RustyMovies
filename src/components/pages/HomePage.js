import React, { Fragment } from "react";
import Navbar from "../utils/Navbar";
import Categories from "../utils/Categories";
const HomePage = () => {
  return (
    <Fragment>
      <Navbar />
      <br/>
      <Categories />
    </Fragment>
  );
};

export default HomePage;
