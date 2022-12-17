import React, { useCallback, useEffect, useState } from "react";
import "./Nav.css";
const Nav = () => {
  const [show, setshow] = useState(false);

  const eventFunc = useCallback(() => {
    if (window.scrollY > 100) {
      setshow(true);
    } else setshow(false);
  }, [setshow]);

  useEffect(() => {
    window.addEventListener("scroll", eventFunc);

    return () => {
      window.removeEventListener("scroll", eventFunc);
    };
  }, []);

  return (
    <div className={`nav ${show ? "nav__black" : ""}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
      />
      <img
        className="nav__avtar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix logo"
      />
    </div>
  );
};

export default Nav;
