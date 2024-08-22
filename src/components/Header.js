import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  return (
    <div className="header">
      <nav className="nav-bar">
        <img className="img-nav-bar" src="./car logo.png" alt="" />
        <ul className="ul-li">
          <li>New Cars</li>
          <li>Used Cars</li>
          <li>About Us</li>
          <li>Sell</li>
        </ul>
        <ul style={{ display: "flex", color: "#fff" }}>
          <PersonIcon />
          <li
            style={{
              margin: 2,
              listStyle: "none",
              fontfamily: "Lato",
              fontsize: 14,
              cursor: "pointer",
            }}
          >
            Sign In
          </li>
        </ul>
      </nav>

      <h1>New Cars</h1>
      <p>Homepage - New Cars</p>
    </div>
  );
};

export default Header;
