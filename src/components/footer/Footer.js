import React, { useEffect, useRef, Fragment } from "react";
import {PartialCss} from "./css/Css"
import TitleCase from "../utils/TitleCase";


const Footer = () => {
    let display = useRef(null);
    useEffect(() => {
      // retrives available categorise from
      // context.availableMS
      let MS = ["Chat", "Playlist"];
      for (let i of MS) {
        let btn = document.createElement("button");
        btn.name = i;
        btn.textContent = TitleCase(i);
        btn.addEventListener("click", Filter);
        display.current.appendChild(btn);
      }
    });
    /**
     *
     * @param {Event} e
     * @description
     * filters movies and series and displays the desired,
     * category for the user.
     */
    const Filter = (e) => {
      console.log("someone cliked me");
      console.dir(e.target.name);
    };
    return (
      <Fragment>
        <div id="footerUiUx" >
          <button> &#10094;</button>
          <section id="filterMS" style={PartialCss} ref={display}></section>
          <button> &#10095;</button>
        </div>
        
      </Fragment>
    );
}




export default Footer
