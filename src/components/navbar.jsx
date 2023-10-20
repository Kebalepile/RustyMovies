export default function Navbar() {
  return (
    <nav id="navigation" className="menu">
        <img src="./assets/img/icons/favicon.png" alt="logo image" id="logo" />
    <input type="checkbox" name="toggle" id="toggle" />
    <label htmlFor="toggle">
        <span>{String.fromCharCode(9776)}</span>
    </label>
    <ul id="nav_links">
        <li id="install" className="page_link">
            <div>
            <img src="./assets/img/icons/download.png" alt="download icon" />
            <p>install</p>
            </div>
       
        </li>
        <li  className="page_link">
         
            <a href="#about">About</a>
        </li>
    </ul>
    </nav>
  );
}
