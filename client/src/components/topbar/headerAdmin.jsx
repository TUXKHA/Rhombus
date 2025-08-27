import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header62">
      <div
        className="logo62"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dash")}
      >
      RHOMBUS
      </div>
      <div className="icons62">
        <spancc
          className="icon"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dash2")}
        >
          <MdPerson size={22} />
        </spancc>
      </div>
    </div>
  );
};

export default Header;