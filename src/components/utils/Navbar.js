import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../utils/SideBar";
const Navbar = () => {
  const [search, setSearch] = useState("search for movie/series");
  const Change = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  return (
    <nav style={navBar}>
      <SideBar />
      <input type="search" value={search} onChange={Change} style={Search} />
      <Link to="#">
        <img href="#" atl="Logo" style={LogoCss} />
      </Link>
    </nav>
  );
};

const navBar = {
  width: "100vw",
  color: "white",
  backgroundColor: "#252525",
  display: "flex",
  flexBase: "1",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
};

const Search = {
  color: "#222",
  border: "none",
  height: "30px",
  width: "250px",
  textAlign: "center",
};

const LogoCss = {
  width: "80px",
  height: "70px",
  backgroundColor: "red",
};
export default Navbar;
