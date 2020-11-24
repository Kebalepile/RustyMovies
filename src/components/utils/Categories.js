import React, { useState, useEffect, useRef } from "react";
// import TitleCase from "./TitleCase";
/**
 * @description
 * displays avaliable cateorgies of moives and series.
 */
const Categories = () => {
  return (
    <section className="categories">
      <div style={SlideShow}>
        <article className="slide" style={SlideCss}>
          <section style={NumberText}>1/2</section>
          <img
            src="https://www.w3schools.com/howto/img_nature_wide.jpg"
            style={{ width: "100%", height: "100%" }}
          />
          <section style={_Text}>Caption Text</section>
          <button className="prev" style={Prev}>
            &#10094;
          </button>

          <button className="next" style={Next}>
            &#10095;
          </button>
        </article>
      </div>
    </section>
  );
};

const SlideShow = {
    position: "relative",
    margin: "auto",
    minWidth:"320px"
  },
  SlideCss = {
    // minWidth: "200px",
    width:"250px",
    height:"150px",
    // minHeight: "150px",
    position: "relative",
    margin: "auto",
  },
  // next and prev same styles
  NP = {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    width: "auto",
    padding: "16px",
    marginTop: "-22px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.3s ease",
    borderRadius: "2px",
    userSelect: "none",
    border: "none",
    opacity: "0.4",
    height: "40px",
    backgroundColor: "#ffb62e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Next = {
    ...NP,
    right: 2,
  },
  Prev = {
    ...NP,
    left: 2,
  },
  _Text = {
    color: "#f2f2f2",
    fontSize: "15px",
    padding: "8px 12px",
    position: "absolute",
    bottom: "8px",
    width: "100%",
    textAlign: "center",
  },
  NumberText = {
    color: "#f2f2f2",
    fontSize: "12px",
    padding: "8px 12px",
    position: "absolute",
    top: "0",
  };

export default Categories;
