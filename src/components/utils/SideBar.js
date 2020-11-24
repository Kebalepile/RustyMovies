import React, { useRef, useEffect} from "react";
import TitleCase from "./TitleCase";
const SideBar = () => {
  const sideBar = useRef(null),
    btn = useRef(null);

  useEffect(() => {
    // cta from context.Sidebar stuff
    let urls = [
      "profile", "people online", "developed By ?",
    "2", "333", "4546"];
    for (let url of urls) {
      let link = document.createElement("a");
      link.href = `/${url}`;
      link.textContent = TitleCase(url);
      sideBar.current.appendChild(link);
    }
  });

  const Close = (e) => {
    sideBar.current.style.display = "none";
    btn.current.style.display = "block";
  };
  const Open = (e) => {
    sideBar.current.style.display = "flex";
    sideBar.current.style.flexFlow = "column nowrap";
    btn.current.style.display = "none";
  };
  return (
    <div>
      <button onClick={Open} ref={btn} style={BtnCss}>
        ☰
      </button>
      <div id="sideBar" ref={sideBar} style={SideBarCss}>
        <button onClick={Close} style={{...BtnCss,...CloseBtn}}>
          Close
        </button>
        <br />
      </div>
    </div>
  );
};

const BtnCss = {
  cursor: "pointer",
  width: "50px",
  height: "50px",
  border: "none",
  backgroundColor:"#00b7eb",
  fontSize:"30px"
},
SideBarCss = {
  display: "none",
  height: "150px",
  width:"120px",
  padding: "5px"
},
CloseBtn = {
  backgroundColor:"#ce2029",
  width: "60px",
  fontSize:"12px"
};

export default SideBar;
